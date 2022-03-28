import { Component, OnInit } from '@angular/core';
import {AppStateService} from "../../../services/app-state.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {LessonBackground} from "../config/seminars-interfaces";

@Component({
  selector: 'app-seminars-base',
  templateUrl: './seminars-base.component.html',
  styleUrls: ['./seminars-base.component.scss']
})
export class SeminarsBaseComponent implements OnInit {

  items$!: Observable<LessonBackground[]>;

  constructor(
      private appStateService: AppStateService,
      private router: Router
  ) { }

  ngOnInit(): void {
    // this.items = this.appStateService
    const currentPage = [...this.router.url.split('/')].pop()!;
    this.items$ = this.appStateService.getLessonsImages(currentPage)
  }

}
