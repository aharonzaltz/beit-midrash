import {Injectable} from "@angular/core";
import {map, skipWhile, switchMap, take, tap} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable, of} from "rxjs";
import {FileType, Lesson, LessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";
import {
    decodeText,
    getFileType,
    getLessonName,
    getNestedPropertyByKey,
    isUid,
} from "./app-utils.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {child, getDatabase, onValue, ref, set, update} from "@angular/fire/database";
import {Book} from "../interfaces/book.interfaces";
import {GeneralData} from "../interfaces/app.interfaces";
import {Database} from "@firebase/database";
import {A} from "@angular/cdk/keycodes";
import {generateAllPages} from "../config/create-sitemap";

@Injectable({providedIn: 'root'})
export class AppStateService {
    private lessonsDataSub = new BehaviorSubject<{ [key: string]: {[key: string]: LessonPackage }} | null>(null);
    private lessonsData$ = this.lessonsDataSub.asObservable();

    private booksDataSub = new BehaviorSubject<{ [key: string]: Book } | null>(null);
    private booksData$ = this.booksDataSub.asObservable();

    constructor(
        private angularFireDatabase: AngularFireDatabase,
        private angularFirestore: AngularFirestore) {
    }

    getLessonsDataFromServer() {
        return this.angularFireDatabase.object<{ [key: string]: { [key: string]: LessonPackage }}>('lessonsData').valueChanges().pipe(
            take(1),
            tap(val => {
                this.setLessonsData(val);
                generateAllPages(val)
                debugger
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

    setLessonsData(data: { [key: string]: {[key: string] : LessonPackage } } | null) {
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

    setGeneralCountDownloadAndWatchLesson(db: Database, isSetDownload = false) {
        const dbRef = ref(db, 'generalData');

        onValue(dbRef, (snapshot) => {
            const generalData: GeneralData = {} as GeneralData;
            let hasSnapshot = false;
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if (childKey) {

                    (generalData as any)[childKey] = childData;
                    hasSnapshot = true
                }
            });
            if (!hasSnapshot) return;
            if (isSetDownload) {
                generalData.countDownload++;
            } else {
                generalData.watchCount++;
            }
            update(dbRef, generalData).then(val => {
            })
        }, {
            onlyOnce: true
        });
    }

    // TODO need to separate data in firebase
    setCountDownloadAndWatchLesson(db: Database, pathBase: string, id: string, source: 'lesson' | 'book', isSetDownload: boolean) {
        const sourcePath = source === 'lesson' ? 'lessonsData' : 'booksData';

        const path = `generalData/${sourcePath}${pathBase}/values/`;
        const dbRef = ref(db, path + `${id}`);

        onValue(dbRef, (snapshot) => {
            const data = {
                downloadCount: 0,
                watchCount: 0,
            }
            let hasSnapshot = false;
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if (childKey) {

                    (data as any)[childKey] = childData;
                    hasSnapshot = true
                }
            });
            if (isSetDownload) {
                data.downloadCount++;
            } else {
                data.watchCount++;
            }
            const functionName = hasSnapshot ? update: set;
            functionName(dbRef, data).then(val => {
                this.setGeneralCountDownloadAndWatchLesson(db, isSetDownload);
            })
        }, {
            onlyOnce: true
        });
    }


    setLessonData(pathBase: string, id: string, source: 'lesson' | 'book', isSetDownload = false) {
        const db = getDatabase();
        this.setGeneralCountDownloadAndWatchLesson(db, isSetDownload)
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
            if (!hasSnapshot) {
                data.downloadCount = 0;
                data.watchCount = 0;
                set(dbRef, data).then(val => {
                    console.log(val)
                })
                return
            }
            const lessonRef = child(ref(db, path), `${id}`);
            data.name = getLessonName(data)
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

    getAllLessons(): Observable<{ [key: string]: { [key: string]: LessonPackage } } | null> {
        return this.lessonsData$;
    }

    getLessonsImages(id: string):Observable<{title?: string, lessons: LessonBackground[]}> {
        return this.lessonsData$.pipe(
            skipWhile(val => !val),
            map(val => {
                const lessonPackages: {[key: string]: LessonPackage } = val![id];
                const title: string = val![id].title as any;
                const lessons = Object.keys(lessonPackages).filter(key => key !== 'title' && !lessonPackages[key].isSubPackage && !lessonPackages[key].hide).map(key => ({
                    ...lessonPackages[key],
                    packageName: key
                })).sort((o1, o2) => {
                    return lessonPackages[o1.packageName].index - lessonPackages[o2.packageName].index
                })
                return {lessons, title}
            })
        )
    }

    getSubLessonsImages(id: string): Observable<{title?: string, lessons: LessonBackground[]} | null> {
        return this.lessonsData$.pipe(
            skipWhile(val => !val),
            map(val => {
                const subPackage = (val as any)?.subPackage
                const item: any = subPackage? subPackage[id]: null;
                if(!item) return null
                const title = item.title;
                const lessons =  Object.keys(item.data).map(key => ({
                    ...item.data[key],
                    packageName: key
                })).sort((o1, o2) => {
                    return item[o1.packageName] - item[o2.packageName]
                })

                return {lessons, title}
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
                if(data?.hide) return {lessonsData: [], title: ''}
                const lessons: Lesson[] = Object.keys(data.values).map(id => ({...data.values[id], id}));
                const title = data.title;
                const lessonsData = lessons.map(item => ({
                    ...item,
                    name: getLessonName(item),
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
                return {...lesson, name: getLessonName(lesson), fileType: getFileType(lesson)}
            })
        )
    }
}
