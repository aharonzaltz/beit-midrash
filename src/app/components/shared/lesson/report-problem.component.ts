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
                        class=" p-button-secondary"></button>
                <button
                        (click)="close(false)" pButton
                        label="ביטול"
                        class="p-mr-2 p-button-outlined"></button>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportProblemComponent {
    description!: string;

    constructor(public ref: DynamicDialogRef) {
    }

    close(isApproved: boolean) {
        if(!isApproved) this.description = '';
        this.ref.close(this.description);
    }

}
