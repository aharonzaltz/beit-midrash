import {Injectable} from "@angular/core";
import {AppDialog} from "../interfaces/app.interfaces";
import {BehaviorSubject} from "rxjs";


@Injectable({providedIn: 'root'})
export class AppDialogService {

    private dialogDataSub = new BehaviorSubject<AppDialog | null>(null);
    getDialogData$ = this.dialogDataSub.asObservable();

    displayDialog(dialogData: AppDialog) {
        this.dialogDataSub.next(dialogData);
    }

    hideDialog() {
        this.dialogDataSub.next(null);
    }

}
