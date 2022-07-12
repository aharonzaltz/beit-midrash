import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    template: `
        <div class="report-problem-container">
            <div class="p-d-flex">

                <textarea [(ngModel)]="description" style="width: 100%" rows="5" pInputTextarea></textarea>
            </div>

            <div class="p-d-flex p-mt-2">
                <button
                        (click)="close(true)" pButton
                        label="אישור"
                        [disabled]="!description"
                        class=" p-button-secondary"></button>
                <button
                        (click)="close(false)" pButton
                        label="ביטול"
                        class="p-mr-2 p-button-outlined"></button>
            </div>

            <div class="d-p-flex p-mt-2">
                <label for="email">כתובת מייל לחזרה - לא נדרש</label>
                <input id="email" type="text" pInputText [(ngModel)]="email">

            </div>
        </div>
    `,
    styles: [`
      input {
        margin-right: 8px;
      }
    `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportProblemComponent {
    description!: string;
    email!: string;

    constructor(public ref: DynamicDialogRef) {
    }

    close(isApproved: boolean) {
        if (!isApproved) {
            this.description = '';
            this.email = '';
        }
        this.ref.close({description: this.description, email: this.email});
    }

}
