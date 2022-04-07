import {Component, OnInit} from '@angular/core';
import {SeminarsPages} from "../../config/seminars.config";
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {AppStateService} from "../../../../services/app-state.service";
import {Observable, Subject} from "rxjs";
import {FileType, Lesson} from "../../../../interfaces/lessons-interfaces";
import {filter, map, skipWhile, startWith, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {LessonService} from "../../../../services/lesson.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-seminars',
    templateUrl: './seminars.component.html',
    styleUrls: ['./seminars.component.scss']
})
export class SeminarsComponent implements OnInit {
    currentPage!: string;
    lessons$!: Observable<{ lessonsData: Lesson[], title: string }>;

    private parentPage!: string;
    lessonShown$ = this.lessonService.currentLesson$;
    destroy$ = new Subject<any>();

    get FileType() : typeof FileType {
        return FileType;
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private lessonService: LessonService,
        private appStateService: AppStateService
    ) {
    }

    ngOnInit(): void {

        this.lessons$ = this.router.events.pipe(
            startWith(''),
            filter((event: any) => event === '' || event instanceof ActivationEnd),
            takeUntil(this.destroy$),

            skipWhile(val => val === this.currentPage),
            tap(val => this.currentPage = val),
            switchMap(val => this.appStateService.getLessons(this.router.url)),
        )
    }

    onLessonClick(lesson: Lesson) {
        this.appStateService.setCountDownloadAndWatchLesson(this.router.url, lesson.id);
        this.lessonService.setCurrentLesson(lesson.id);
        this.router.navigate([`${lesson.id}`], {relativeTo: this.route})
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
