import {Injectable} from "@angular/core";
import {map, skipWhile, switchMap, take, tap} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable, of} from "rxjs";
import {FileType, Lesson, LessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";
import {decodeText, getFileType, getNestedPropertyByKey, isUid, removeNumbersFromKeys} from "./app-utils.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {child, getDatabase, increment, onValue, ref, set, update} from "@angular/fire/database";
import {v4 as uuid} from 'uuid';
import {Book} from "../interfaces/book.interfaces";

@Injectable({providedIn: 'root'})
export class AppStateService {
    private lessonsDataSub = new BehaviorSubject<{ [key: string]: LessonPackage } | null>(null);
    private lessonsData$ = this.lessonsDataSub.asObservable();

    private booksDataSub = new BehaviorSubject<{ [key: string]: Book } | null>(null);
    private booksData$ = this.booksDataSub.asObservable();

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFirestore: AngularFirestore) {
    }

    getLessonsDataFromServer() {
        return this.angularFireDatabase.object<{ [key: string]: LessonPackage }>('lessonsData').valueChanges().pipe(
            take(1),
            tap(val => {
                this.setLessonsData(val);
            })
        )
    }

    getBooksDataFromServer() {
        return this.angularFireDatabase.object<{ [key: string]: Book }>('booksData').valueChanges().pipe(
            take(1),
            tap(val => {
                this.setBooksData(val);
            })
        )

    }

    setLessonsData(data: { [key: string]: LessonPackage } | null) {
        if (data) {
            this.lessonsDataSub.next(data);
        }
    }

    setBooksData(data: { [key: string]: Book } | null) {
        if (data) {
            Object.keys(data!).forEach((key: string) => {
                data[key].id = key;
                data[key].name = decodeText(data[key].url.split('/').pop()!);
            })
            this.booksDataSub.next(data);
        }
    }

    setCountDownloadAndWatchLesson(pathBase: string, id: string, source: 'lesson' | 'book', isSetDownload = false) {
        const db = getDatabase();
        const sourcePath = source === 'lesson' ? 'lessonsData' : 'booksData';
        const path = `/${sourcePath}${pathBase}/values/`;
        const dbRef = ref(db, path + `${id}`);

        onValue(dbRef, (snapshot) => {
            const data: Lesson = {} as Lesson;
            let hasSnapshot = false;
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if (childKey) {

                    (data as any)[childKey] = childData;
                    hasSnapshot = true
                }
            });
            if (!hasSnapshot) return;
            const lessonRef = child(ref(db, path), `${id}`);
            data.name = decodeText(data.url.split('/').pop()!);
            data.fileType = getFileType(data);
            if (isSetDownload) {
                data.downloadCount++;
            } else {
                data.watchCount++;
            }
            update(lessonRef, data).then(val => {
            })
        }, {
            onlyOnce: true
        });
    }

    getAllLessons(): Observable<{ [key: string]: LessonPackage } | null> {
        return this.lessonsData$;
    }

    getLessonsImages(id: string): Observable<LessonBackground[]> {
        return this.lessonsData$.pipe(
            skipWhile(val => !val),
            map(val => {
                const item: LessonPackage | any = val![id];
                return Object.keys(item).map(key => ({
                    ...item[key],
                    packageName: key
                })).sort((o1, o2) => {
                    return item[o1.packageName].index - item[o2.packageName].index
                })
            })
        )
    }

    getLessonsImagesChildren(item: { [key: string]: LessonPackage }, packageName: string): Observable<LessonBackground[]> {
        return of(Object.keys(item).map(key => ({
            ...item[key],
            packageName: packageName + '/lessons/' + key,
            orderName: key,
        })).sort((o1, o2) => {
            return item[o1.orderName].index - item[o2.orderName].index
        }))
    }

    private getLessonsData(pathBase: string): Observable<LessonPackage> {
        const pathSplitted = pathBase.split("/");
        pathBase.split("/").slice(0, pathBase.split("/").length - 1);
        if (isUid(pathSplitted[pathSplitted.length - 1])) {
            pathBase = pathSplitted.slice(0, pathSplitted.length - 1).join('/');
        }
        const path = pathBase.split('/').filter(item => !!item && item !== "home").join('/');
        return this.lessonsData$.pipe(
            skipWhile(val => !val),
            map(val => getNestedPropertyByKey(val!, path))
        )
    }

    getBooks(): Observable<Book[]> {
        return this.booksData$.pipe(
            skipWhile(books => !books),
            map(books => Object.values(books!))
        )
    }

    getBookById(bookId: string): Observable<Book> {
        return this.booksData$.pipe(
            skipWhile(books => !books),
            map(books => {
                return books![bookId]
            })
        )
    }

    getLessons(pathBase: string): Observable<{ lessonsData: Lesson[], title: string }> {
        return this.getLessonsData(pathBase).pipe(
            map(data => {
                const lessons: Lesson[] = Object.keys(data.values).map(id => ({...data.values[id], id}));
                const title = data.title;
                const lessonsData = lessons.map(item => ({
                    ...item,
                    name: item.name || decodeText(item.url.split('/').pop()!),
                    fileType: item.fileType || getFileType(item)
                })).sort(((a, b) => a.name.localeCompare(b.name)))
                return {lessonsData, title}
            })
        )
    }

    getLessonById(pathBase: string, id: string): Observable<Lesson> {
        return this.getLessonsData(pathBase).pipe(
            map(data => {
                const lesson = data.values[id];
                return {...lesson, name: decodeText(lesson.url.split('/').pop()!), fileType: getFileType(lesson)}
            })
        )
    }
}