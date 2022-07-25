import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {AppStateService} from "../../../../services/app-state.service";
import {Observable, Subject} from "rxjs";
import {FileType, Lesson} from "../../../../interfaces/lessons-interfaces";
import {filter, map, skipWhile, startWith, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {LessonService} from "../../../../services/lesson.service";
import {isMobile} from "../../../../services/app-utils.service";
import {Location} from "@angular/common";
import {SeminarsService} from "../services/seminars.service";
import {APP_TITLE} from "../../../../config/app-config";
import {Title} from "@angular/platform-browser";
import {MetaDataPageService} from "../../../../services/meta-data-page.service";

@Component({
    selector: 'app-seminars',
    templateUrl: './seminars.component.html',
    styleUrls: ['./seminars.component.scss']
})
export class SeminarsComponent implements OnInit {
    currentPage!: string;
    lessons$!: Observable<{ lessonsData: Lesson[], title: string }>;

    lessonShown$ = this.lessonService.currentLesson$;
    destroy$ = new Subject<any>();
    isMobile = isMobile();

    get FileType(): typeof FileType {
        return FileType;
    }

    constructor(
        private seminarsService: SeminarsService,
        private router: Router,
        private route: ActivatedRoute,
        private lessonService: LessonService,
        private location: Location,
        private metaDataPageService: MetaDataPageService,
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
            tap(lessons => {
                this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${lessons.title || ''}`);

            })
        )
    }

    onLessonClick(lesson: Lesson) {
        this.appStateService.setLessonData(this.router.url, lesson.id, 'lesson');
        this.lessonService.setCurrentLesson(lesson.id);
        // this.router.navigate([`${lesson.id}`], {relativeTo: this.route})
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onClickBack() {
        if (window.history.length > 1) {
            this.location.back();
        } else {
            this.router.navigate(['../']);
        }
    }
}
