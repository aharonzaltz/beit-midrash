import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService} from "../../../services/app-state.service";
import {Observable, of} from "rxjs";
import {ActivatedRoute, ActivationEnd, ActivationStart, Router} from "@angular/router";
import {LessonBackground, LessonPackage} from "../../../interfaces/lessons-interfaces";
import {filter, map, startWith, switchMap, take, tap} from "rxjs/operators";
import {SeminarsPages} from "../config/seminars.config";
import {AppPages} from "../../../config/app-config";
import {startsWith} from "lodash";
import {SeminarsService} from "./services/seminars.service";

@Component({
  selector: 'app-seminars-base',
  templateUrl: './seminars-base.component.html',
  styleUrls: ['./seminars-base.component.scss']
})
export class SeminarsBaseComponent implements OnInit, OnDestroy {

  items$!: Observable<LessonBackground[]>;
  currenPage!: AppPages;
  showBack = false;

  constructor(
      private appStateService: AppStateService,
      private seminarsService: SeminarsService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  get AppPages() : typeof AppPages {
    return AppPages
  }

  ngOnInit(): void {
    this.getItems();

    this.getCurrentLessonBackground();
  }

  private getItems() {
    this.items$ = this.router.events.pipe(
        startWith(''),
        filter((event: any) => event === '' || event instanceof ActivationEnd),
        map(event => {
          return [...this.router.url.split('/')].pop()! as AppPages;
        }),
        tap(val => {
          this.currenPage = val;

        }),
        switchMap(currentPage => this.appStateService.getLessonsImages(currentPage))
    )
  }

  onItemClick(lessonBackground: LessonBackground) {
    if(lessonBackground.lessons) {
      this.seminarsService.setLessonBackground(lessonBackground);
      this.showBack = true;
      this.items$ = this.appStateService.getLessonsImagesChildren(lessonBackground.lessons, lessonBackground.packageName);
    } else {

      this.router.navigate([lessonBackground.packageName], {relativeTo:this.route})
    }
  }

  private getCurrentLessonBackground() {
    this.seminarsService.getLessonBackground$.pipe(take(1)).subscribe(
        val => {
          if(val) {
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
