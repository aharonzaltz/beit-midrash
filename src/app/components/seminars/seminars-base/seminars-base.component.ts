import { Component, OnInit } from '@angular/core';
import {AppStateService} from "../../../services/app-state.service";
import {Observable, of} from "rxjs";
import {ActivatedRoute, ActivationEnd, ActivationStart, Router} from "@angular/router";
import {LessonBackground, LessonPackage} from "../../../interfaces/lessons-interfaces";
import {filter, map, startWith, switchMap, tap} from "rxjs/operators";
import {SeminarsPages} from "../config/seminars.config";
import {AppPages} from "../../../config/app-config";
import {startsWith} from "lodash";

@Component({
  selector: 'app-seminars-base',
  templateUrl: './seminars-base.component.html',
  styleUrls: ['./seminars-base.component.scss']
})
export class SeminarsBaseComponent implements OnInit {

  items$!: Observable<LessonBackground[]>;
  currenPage!: AppPages;

  constructor(
      private appStateService: AppStateService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  get AppPages() : typeof AppPages {
    return AppPages
  }

  ngOnInit(): void {
    this.items$ = this.router.events.pipe(
        startWith(''),
        filter((event: any) => event === '' || event instanceof ActivationEnd),
        map(event => {
          return [...this.router.url.split('/')].pop()! as AppPages;
        }),
        tap(val => this.currenPage = val),
        switchMap(currentPage => this.appStateService.getLessonsImages(currentPage))
    )
  }

  onItemClick(lessonBackground: LessonBackground) {
    if(lessonBackground.lessons) {
      this.items$ = this.appStateService.getLessonsImagesChildren(lessonBackground.lessons, lessonBackground.packageName);
    } else {
      this.router.navigate([lessonBackground.packageName], {relativeTo:this.route})
    }
  }
}
