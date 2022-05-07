import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {Title} from "@angular/platform-browser";

import {FileType, Lesson} from "../../../interfaces/lessons-interfaces";
import {concatMap, finalize, map, switchMap, take, tap} from "rxjs/operators";
import {AppStateService} from "../../../services/app-state.service";
import {LessonService} from "../../../services/lesson.service";
import {ActivatedRoute, Router} from "@angular/router";
import {noop, Observable, of} from "rxjs";
import {isMobile} from "../../../services/app-utils.service";
import {Download} from "../../../services/download";
import {DownloadService} from "../../../services/download.service";
import {MessageDetails, Severity} from "../../../interfaces/app.interfaces";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {OverlayPanel} from "primeng/overlaypanel/overlaypanel";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonComponent implements OnInit, OnDestroy {

  @ViewChild('op') overlayPanel!: OverlayPanel;

  lesson$!: Observable<Lesson>;
  download$!: Observable<Download | null>

  downloadInProcess = false;
  private id!: string;
  pageUrl!: string;
  private pathBase!: string;
  isMobile = isMobile();
  private userIsLogin = false;
  userIsLogin$!: Observable<boolean>


  get FileType(): typeof FileType {
    return FileType
  }

  constructor(
      private appStateService: AppStateService,
      private messageService: MessageService,
      private lessonService: LessonService,
      private downloads: DownloadService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private titleService: Title
  ) { }

  ngOnInit(): void {
    this.lesson$ = this.route.parent!.url.pipe(
        map(val => this.router.url.split('/').filter(item => !!item)),
        tap(pathBase => {
          this.id = pathBase[pathBase.length-1];
          this.lessonService.setCurrentLesson(this.id);
          this.pathBase = pathBase.slice(0, pathBase.length-1).join('/');
        }),
        switchMap(pathBase => {
          return this.appStateService.getLessonById(this.pathBase, this.id)
        }),
        tap(lesson => {
          this.titleService.setTitle(lesson.name)
        })
    )
    this.pageUrl = window.location.href;

    this.userIsLogin$ = this.authService.isLoggedIn().pipe(
        tap(val => {
          console.log('isLoggedIn', val)
          this.userIsLogin = val
        })
    );
  }

  onContextmenu() {
    return false;
  }

  cancelDownload() {
    this.download$ = of(null);
    this.downloadInProcess = false;
  }

  onReportProblemClick(lesson: Lesson) {
    this.lessonService.onReportProblemClick(lesson).pipe(take(1)).subscribe(noop)
  }

  onDownloadClick(event: Event, downloadMp3 = false) {
    if(downloadMp3 && this.isMobile && !this.userIsLogin) {
      this.overlayPanel.toggle(event)
      return
    }

    this.downloadInProcess = true;
    this.appStateService.setLessonData(`/${this.pathBase}`, this.id, 'lesson',true);
    this.download$ = this.lesson$.pipe(take(1), concatMap(lesson => {
      const {url, fileName} = this.lessonService.getUrlAndFileName(lesson, downloadMp3);
      return this.downloads.download(url, fileName).pipe(
          tap(val => {
            if(!val) {
              this.messageService.add({severity:Severity.error, detail: MessageDetails.errorDownload});
            }
          }),
          finalize(() => this.downloadInProcess = false)
      )
    }))
  }

  onClickBack() {

    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['../']);
    }
  }

  ngOnDestroy(): void {
    this.lessonService.setCurrentLesson(null);
  }
}
