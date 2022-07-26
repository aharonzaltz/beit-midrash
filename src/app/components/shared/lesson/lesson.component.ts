import {ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {ReportProblemComponent} from "./report-problem.component";
import {MetaDataPageService} from "../../../services/meta-data-page.service";
import {DownloadLessonService} from "./download-lesson.service";

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  providers: [DownloadLessonService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonComponent implements OnInit, OnDestroy {

  @ViewChild('op') overlayPanel!: OverlayPanel;
  ref!: DynamicDialogRef;

  lesson$!: Observable<Lesson>;
  download$: Observable<Download | null> = this.downloadLessonService.getDownloadStatus$;

  downloadInProcess$ = this.downloadLessonService.downloadInProcess$;
  private id!: string;
  pageUrl!: string;
  private pathBase!: string;
  isMobile = isMobile();
  private userIsLogin = false;
  userIsLogin$!: Observable<boolean>
  private lesson!: Lesson;


  get FileType(): typeof FileType {
    return FileType
  }

  constructor(
      private appStateService: AppStateService,
      private messageService: MessageService,
      private lessonService: LessonService,
      private downloads: DownloadService,
      private downloadLessonService: DownloadLessonService,
      private authService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      public dialogService: DialogService,
      private metaDataPageService: MetaDataPageService
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
          return this.appStateService.getLessonById(this.pathBase, this.id);
        }),
        tap(lesson => {
          this.metaDataPageService.changeMetaData(lesson.name);
          this.lesson = lesson;
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



  show(lesson: Lesson) {
    this.ref = this.dialogService.open(ReportProblemComponent, {
      header: 'תיאור הבעיה',
      footer: 'אם ברצונכם במענה יש למלא כתובת מייל',
      width: '40%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.pipe(
        take(1),
        switchMap(({description, email}) => {
          if (lesson && description) {
            return this.lessonService.onReportProblemClick(lesson, description, email)
          } else {
            return of(null)
          }
        })
    ).subscribe(noop)
  }

  onContextmenu() {
    return false;
  }

  cancelDownload() {
    this.download$ = of(null);
    this.downloadLessonService.setDownloadInProcess(false);
  }

  onDownloadClick(event: Event, downloadMp3 = false) {
    if(downloadMp3 && this.isMobile && !this.userIsLogin) {
      this.overlayPanel.toggle(event)
      return
    }

    // this.downloadInProcess = true;
    this.appStateService.setLessonData(`/${this.pathBase}`, this.id, 'lesson',true);
    this.downloadLessonService.downloadLesson(this.lesson, downloadMp3)

    // this.download$ = this.lesson$.pipe(take(1), concatMap(lesson => {
    //   const {url, fileName} = this.lessonService.getUrlAndFileName(lesson, downloadMp3);
    //   return this.downloads.download(url, fileName).pipe(
    //       tap(val => {
    //         if(!val) {
    //           this.messageService.add({severity:Severity.error, detail: MessageDetails.errorDownload});
    //         }
    //       }),
    //       finalize(() => this.downloadInProcess = false)
    //   )
    // }))
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
