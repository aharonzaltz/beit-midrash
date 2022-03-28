import { Component, OnInit } from '@angular/core';
import {SeminarsPages} from "../../config/seminars.config";
import {ActivatedRoute, Router} from "@angular/router";
import {AppStateService} from "../../../../services/app-state.service";
import {Observable} from "rxjs";
import {Lesson} from "../../../../interfaces/lessons-interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-seminars',
  templateUrl: './seminars.component.html',
  styleUrls: ['./seminars.component.scss']
})
export class SeminarsComponent implements OnInit {
  currentPage!: SeminarsPages;
  lessons$!: Observable<{lessonsData: Lesson[], title: string}>;

  lesson?: Lesson;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private appStateService: AppStateService,
  ) { }

  ngOnInit(): void {
    this.currentPage = [...this.router.url.split('/')].pop()! as SeminarsPages;
    this.lessons$ = this.route.parent!.url.pipe(
        switchMap(val => this.appStateService.getLessons(val[0].path, this.currentPage))
    )
  }

  onLessonClick(lesson: Lesson) {
   this.lesson = lesson;
  }
}
