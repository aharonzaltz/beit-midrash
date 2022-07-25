import { Component, OnInit } from '@angular/core';
import {APP_TITLE, LEFT_HOME_MENU_ITEMS, RIGHT_HOME_MENU_ITEMS} from "../../../config/app-config";
import {HomeLessonBackground} from "../../../interfaces/lessons-interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {LessonService} from "../../../services/lesson.service";
import {MenuItem} from "primeng/api";
import { isMobile } from 'src/app/services/app-utils.service';
import {Title} from "@angular/platform-browser";
import {MetaDataPageService} from "../../../services/meta-data-page.service";
import {HomeMenuItem} from "../../../interfaces/app.interfaces";
import {AppDialogService} from "../../../services/app-dialog.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  leftMenuItems: {title: string, values: HomeLessonBackground[]}[] = [...LEFT_HOME_MENU_ITEMS];
  rightMenuItems: HomeMenuItem[] = [...RIGHT_HOME_MENU_ITEMS];
  lessonShown$ = this.lessonService.currentLesson$;
  isMobile = isMobile();

  constructor(
      private lessonService: LessonService,
      private router: Router,
      public route: ActivatedRoute,
      private metaDataPageService: MetaDataPageService,
      private appDialogService: AppDialogService
  ) {
    this.metaDataPageService.changeMetaData(APP_TITLE);
  }

  ngOnInit(): void {
  }

  // onItemClick(leftMenuItem: {title: string; values: HomeLessonBackground[]}, item: HomeLessonBackground) {
  //   console.log(leftMenuItem, item)
  //   if(item.directUrl) {
  //     this.router.navigate([item.url], {relativeTo: this.route})
  //   } else {
  //     this.router.navigate([item.url])
  //   }
  // }

  onRightItemClick(rightItem: HomeMenuItem) {
    if(rightItem.url) {
      window.location.href = rightItem.url;
    }
    else if(rightItem.isDialog) {
      this.appDialogService.displayDialog({header: rightItem.header!, content: rightItem.content!})
    }
    // else {
    //
    //   this.router.navigate([rightItem.routerLink])
    // }
  }
}
