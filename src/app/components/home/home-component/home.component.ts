import { Component, OnInit } from '@angular/core';
import {LEFT_HOME_MENU_ITEMS, RIGHT_HOME_MENU_ITEMS} from "../../../config/app-config";
import {HomeLessonBackground} from "../../../interfaces/lessons-interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonService} from "../../../services/lesson.service";
import {MenuItem} from "primeng/api";
import { isMobile } from 'src/app/services/app-utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  leftMenuItems: {title: string, values: HomeLessonBackground[]}[] = [...LEFT_HOME_MENU_ITEMS];
  rightMenuItems: MenuItem[] = [...RIGHT_HOME_MENU_ITEMS];
  lessonShown$ = this.lessonService.currentLesson$;
  isMobile = isMobile();

  constructor(
      private lessonService: LessonService,
      private router: Router,
      private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  onItemClick(leftMenuItem: {title: string; values: HomeLessonBackground[]}, item: HomeLessonBackground) {
    console.log(leftMenuItem, item)
    if(item.directUrl) {
      this.router.navigate([item.url], {relativeTo: this.route})
    } else {
      this.router.navigate([item.url])
    }
  }

  onRightItemClick(rightItem: MenuItem) {
    if(rightItem.url) {
      window.location.href = rightItem.url;
    }
    this.router.navigate([rightItem.routerLink])
  }
}
