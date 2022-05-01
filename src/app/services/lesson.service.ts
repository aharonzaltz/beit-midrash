import {Inject, Injectable} from "@angular/core";
import {Lesson} from "../interfaces/lessons-interfaces";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, switchMap, take, tap} from "rxjs/operators";
import {saveAs} from "file-saver";
import {download} from "./download";
import {Saver, SAVER} from "./saver.provider";
import {ContactService, Message} from "../components/contact/contact/contact.service";
import {AuthService} from "./auth.service";
import {MessageDetails, Severity} from "../interfaces/app.interfaces";
import {MessageService} from "primeng/api";


@Injectable({providedIn: 'root'})
export class LessonService {

    currentLessonSub = new BehaviorSubject<string | null>(null);
    currentLesson$ = this.currentLessonSub.asObservable();

    constructor(
        private http: HttpClient,
        private contactService: ContactService,
        private authService: AuthService,
        private messageService: MessageService,
        @Inject(SAVER) private save: Saver
    ) {
    }

    private downloadFile(link: string | null, fileName: string, target = '_blank') {
        if(!link) return;
        const el = document.createElement("a");
        el.setAttribute("href", link);
        el.setAttribute("download", fileName);
        el.setAttribute('target', target);
        document.body.appendChild(el);
        el.click();
        el.remove();
    }

    downloadLesson1(lesson: Lesson)  {
        this.downloadFile(lesson.url, lesson.name);
    }

    downloadLesson(lesson: Lesson): Observable<Blob> {
        const headers = new HttpHeaders()
            .append('Content-Type', 'application/json')
            .append('Access-Control-Allow-Headers', 'Content-Type')
            .append('Access-Control-Allow-Methods', 'GET')
            .append('Access-Control-Allow-Origin', '*');
        return this.http.get(lesson.url, {observe: 'response', responseType: 'blob', headers}).pipe(
            download(blob => this.save(blob, `${lesson.name}.${lesson.url.split('.').pop()}`)),
            map((res: any) => res.body),
            // tap(blob => {
            //     saveAs(blob, `${lesson.name}.${lesson.url.split('.').pop()}`)
            // })
        )
    }

    setCurrentLesson(lessonId: string | null) {
        setTimeout(() => {
            this.currentLessonSub.next(lessonId);
        },1)
    }

    getUrlAndFileName(lesson: Lesson, downloadAsMp3 = false): {url: string, fileName: string} {
        const url = downloadAsMp3 ? lesson.mp3Url!: lesson.url;
        const fileName = `${lesson.name}.${url.split('.').pop()}`;
        return {url, fileName}
    }

    onReportProblemClick(lesson: Lesson) {
        return this.authService.getUserData$.pipe(
            take(1),
            switchMap(userData => {
                // if(!userData){
                //     this.messageService.add({severity:Severity.error, detail: MessageDetails.errorSendMessage});
                //     return of(null)
                // }
                const message: Message = {name: userData?.displayName || '', email: userData?.email || '', content: lesson.name}
                return this.contactService.sendMessageToMail(message)
            })
        )
    }
}