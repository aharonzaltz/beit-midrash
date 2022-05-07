import {Injectable} from "@angular/core";
import {AppStateService} from "../../../services/app-state.service";
import {BehaviorSubject, forkJoin} from "rxjs";
import {map, skipWhile, take} from "rxjs/operators";
import {decodeText, getFileType, getLessonName} from "../../../services/app-utils.service";
import {Lesson, LessonBackground, LessonPackage} from "../../../interfaces/lessons-interfaces";

@Injectable({providedIn: 'root'})
export class SearchService {

    private searchValueSub = new BehaviorSubject< string | null>(null);
    searchValue$ = this.searchValueSub.asObservable();

    constructor(
        private appStateService: AppStateService
    ) {

    }

    setSearchValue(searchValue: string) {
        this.searchValueSub.next(searchValue);
    }


    onSearch(query: string, searchByTopic: boolean){
        return forkJoin([
            this.appStateService.getAllLessons().pipe(skipWhile(val => !val), take(1)),
            this.appStateService.getBooks().pipe(take(1))
            ]).pipe(
                map(([lessons, books]) => {
                    return this.getNestedLessonWithPath(lessons as any, query, searchByTopic)
                })
        )
    }

    private getNestedLessonWithPath(lessonPackages: {[key: string]: {[key: string]: LessonPackage | LessonBackground}}, query: string, searchByTopic: boolean) {
        const dataFiltered: Lesson[] = []
        Object.keys(lessonPackages).forEach(lessonPackageKey => {
            let path = lessonPackageKey;
            const lessonPackageObj = lessonPackages[lessonPackageKey];
            Object.keys(lessonPackageObj).forEach(lessonPackageObjKey => {
                const lessonPackage = lessonPackageObj[lessonPackageObjKey];

                if(lessonPackage.hasOwnProperty('lessons')) {
                    Object.keys((lessonPackage as LessonBackground).lessons!).forEach(packageKey => {
                        const lessonsObj = ((lessonPackage as LessonBackground).lessons![packageKey] as LessonPackage);
                        const lessonsFiltered = this.getLessonsValuesWithPath(lessonPackage as LessonPackage, query, lessonsObj.values,
                            `${path}/${lessonPackageObjKey}/lessons/${packageKey}`, searchByTopic)
                        dataFiltered.push(...lessonsFiltered)
                    })
                } else if(lessonPackage.hasOwnProperty('values')){

                    const lessonsFiltered =
                        this.getLessonsValuesWithPath(lessonPackage as LessonPackage,
                            query, (lessonPackageObj[lessonPackageObjKey] as LessonPackage).values
                            , `${path}/${lessonPackageObjKey}`, searchByTopic)
                    dataFiltered.push(...lessonsFiltered)
                }

            })
        })
        return dataFiltered;
    }

    private getLessonsValuesWithPath(lessonPackage: LessonPackage, query: string, valuesFromObj: {[key: string]: Lesson}, path: string, searchByTopic: boolean): Lesson[] {
        const dataFiltered:Lesson[] = []

        const values = Object.keys(valuesFromObj).map(lessonKey => {
            const item = valuesFromObj[lessonKey]
            return {
                ...item,
                name: getLessonName(item),
                fileType: getFileType(item),
                path: `${path}/${lessonKey}`
            }
        })
        values.forEach(lesson => {
            const searchBy = searchByTopic ? [lessonPackage.name, lessonPackage.title]: [lessonPackage.name, lessonPackage.title, lesson.name]
            if(searchBy.some(item => !!item && item.includes(query))) {
                dataFiltered.push(lesson)
            }
        })
        return dataFiltered;
    }

}