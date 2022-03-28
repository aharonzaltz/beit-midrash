import {Injectable} from "@angular/core";
import {map, skipWhile, take, tap} from "rxjs/operators";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable, of} from "rxjs";
import {Lesson, LessonPackage} from "../interfaces/lessons-interfaces";
import {decodeText, removeNumbersFromKeys} from "./app-utils.service";


@Injectable({providedIn: 'root'})
export class AppStateService {
    private dataSub = new BehaviorSubject<{ [key: string]: LessonPackage} | null>(null);
    private data$ = this.dataSub.asObservable();

    getDataFromServer(angularFireDatabase: AngularFireDatabase) {
        return angularFireDatabase.object<{ [key: string]: LessonPackage }>('data').valueChanges().pipe(
            take(1),
            tap(val => {
                this.setData(removeNumbersFromKeys(val));
            })
        )

    }

    setData(data: {[key: string]: LessonPackage} | null) {
        if(data) {
            this.dataSub.next(data);
        }
    }

    getAllData(): Observable<{ [key: string]: LessonPackage} | null> {
        return this.data$;
    }

    getLessonsImages(id: string): Observable<any> {
        return this.data$.pipe(
            skipWhile(val => !val),
            map(val => {
                const item: LessonPackage | any = val![id];
                return Object.keys(item).map(key => ({packageName: key, background: item[key].background, name: item[key].name}))
            })
        )
    }

    decodeHtml(html: any) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    getLessons(parentPage: string, currentPage: string): Observable<{lessonsData: Lesson[], title: string}> {
        return this.data$.pipe(
            skipWhile(val => !val),
            map(val => {
                const data = (val as any)[parentPage][currentPage]
                const lessons: Lesson[] = data.values;
                const title = data.title;
                const lessonsData =  lessons.map(item => ({name:decodeText(item.url.split('/').pop()!), url: item.url}))
                return {lessonsData, title}
            })
        )
        
    }
}