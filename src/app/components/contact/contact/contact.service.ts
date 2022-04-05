import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, tap} from "rxjs/operators";
import {of} from "rxjs";
import {MessageDetails, Severity} from "../../../interfaces/app.interfaces";
import {MessageService} from "primeng/api";

export interface Message {
    name: string;
    email: string;
    content: string;
}

@Injectable({providedIn: 'root'})
export class ContactService {


    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {
    }

    sendMessageToMail(message: Message) {
        const email = message;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post('https://formspree.io/f/xayvdzav',
            { name: email.name, replyto: email.email, message: email.content },
            { 'headers': headers }).pipe(
                catchError(val => {
                    this.messageService.add({severity:Severity.error, detail: MessageDetails.errorDownload});
                    return of(null)
                }),
                tap(val => val  && this.messageService.add({severity:Severity.success, detail: MessageDetails.successSendMessage}))
        )
    }
}