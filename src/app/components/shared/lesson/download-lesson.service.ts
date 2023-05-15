import {Injectable} from "@angular/core";
import {finalize, tap} from "rxjs/operators";
import {MessageDetails, Severity} from "../../../interfaces/app.interfaces";
import {DownloadService} from "../../../services/download.service";
import {LessonService} from "../../../services/lesson.service";
import {FileType, Lesson} from "../../../interfaces/lessons-interfaces";
import {MessageService} from "primeng/api";
import {BehaviorSubject, noop} from "rxjs";
import {Download} from "../../../services/download";
import {isIOSDevice} from "../../../services/app-utils.service";

@Injectable()
export class DownloadLessonService {

    private downloadInProcessSub = new BehaviorSubject<boolean>(false);
    downloadInProcess$ = this.downloadInProcessSub.asObservable();

    private downloadStatusSub = new BehaviorSubject<Download | null>(null);
    getDownloadStatus$ = this.downloadStatusSub.asObservable();

    constructor(
        private downloads: DownloadService,
        private lessonService: LessonService,
        private messageService: MessageService,
    ) {
    }

    downloadLesson(lesson: Lesson, downloadAsMp3 = false) {
        this.downloadInProcessSub.next(true);
        let isFirstRes = true
        const {url, fileName} = this.lessonService.getUrlAndFileName(lesson, downloadAsMp3);
        if(lesson.fileType === FileType.pdf && isIOSDevice()) {
            return this.downloads.downloadPdfFile(url, fileName);
        }
        this.downloads.download(url, fileName).pipe(
            tap(val => {
                if(isFirstRes){
                    this.messageService.add({severity:Severity.success, detail: MessageDetails.downloadInProcess, life: 100000});
                }
                isFirstRes = false;
                this.downloadStatusSub.next(val);
                if(!val) {
                    this.messageService.add({severity:Severity.error, detail: MessageDetails.errorDownload});
                }
            }),
            finalize(() => {
                this.downloadInProcessSub.next(false)
                setTimeout(() => {
                    this.messageService.clear();
                }, 2000)

            })
        ).subscribe(noop)
    }

    setDownloadInProcess(downloadInProcess: boolean) {
        this.downloadInProcessSub.next(downloadInProcess)
    }
}
