import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService} from "../../../services/app-state.service";
import {forkJoin, Observable} from "rxjs";
import {ActivatedRoute, ActivationEnd, Router} from "@angular/router";
import {LessonBackground} from "../../../interfaces/lessons-interfaces";
import {filter, map, startWith, switchMap, take, tap} from "rxjs/operators";
import {APP_TITLE, AppPages} from "../../../config/app-config";
import {SeminarsService} from "./services/seminars.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-seminars-base',
    templateUrl: './seminars-base.component.html',
    styleUrls: ['./seminars-base.component.scss']
})
export class SeminarsBaseComponent implements OnInit, OnDestroy {

    data$!: Observable<{ title?: string, lessons: LessonBackground[], subItems: { title?: string, lessons: LessonBackground[] } | null }>;
    currenPage!: AppPages;
    showBack = false;

    constructor(
        private appStateService: AppStateService,
        private seminarsService: SeminarsService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title
    ) {
    }

    get AppPages(): typeof AppPages {
        return AppPages
    }

    ngOnInit(): void {
        // this.titleService.setTitle(APP_TITLE)
        this.getItems();

        this.getCurrentLessonBackground();
    }

    private getItems() {
        this.data$ = this.router.events.pipe(
            startWith(''),
            filter((event: any) => event === '' || event instanceof ActivationEnd),
            map(event => {
                return [...this.router.url.split('/')].pop()! as AppPages;
            }),
            tap(val => {
                this.currenPage = val;

            }),
            switchMap((currentPage: string) =>
                forkJoin([
                    this.appStateService.getLessonsImages(currentPage).pipe(take(1)),
                    this.appStateService.getSubLessonsImages(currentPage).pipe(take(1))
                ]).pipe(
                    map(val => {
                        console.log(val)
                        return {...val[0], subItems: val[1]}
                    })
                )
            ),
        )
    }

    onItemClick(lessonBackground: LessonBackground) {
        if (lessonBackground.lessons) {
            this.seminarsService.setLessonBackground(lessonBackground);
            this.showBack = true;
            this.data$ = this.appStateService.getLessonsImagesChildren(lessonBackground.lessons, lessonBackground.packageName).pipe(
                map(val => ({lessons: val, subItems: null}))
            );
        } else {

            this.router.navigate([lessonBackground.packageName], {relativeTo: this.route})
        }
    }

    private getCurrentLessonBackground() {
        this.seminarsService.getLessonBackground$.pipe(take(1)).subscribe(
            val => {
                if (val) {
                    this.onItemClick(val)
                }
            })
    }

    onClickBack() {
        this.getItems();
        this.showBack = false;
    }

    ngOnDestroy(): void {

    }


}
