import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {LessonBackground} from "../../../../interfaces/lessons-interfaces";


@Injectable({providedIn: 'root'})
export class SeminarsService {
    private lessonBackgroundSub = new BehaviorSubject<LessonBackground | null>(null)
    getLessonBackground$ = this.lessonBackgroundSub.asObservable();


    setLessonBackground(lessonBackground: LessonBackground | null) {
        this.lessonBackgroundSub.next(lessonBackground);
    }
}