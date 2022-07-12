import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {LessonComponent} from "./lesson.component";
import {ButtonModule} from "primeng/button";
import {FileSaverModule} from "ngx-filesaver";
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ToastModule} from 'primeng/toast';
import {SafePipeModule} from "../../../pipes/safe.pipe";
import {OverflowBodyModule} from "../../../directives/overflow-body.directive";
import {TooltipModule} from 'primeng/tooltip';
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DialogService, DynamicDialogModule} from 'primeng/dynamicdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ReportProblemComponent} from "./report-problem.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";

@NgModule({
    declarations: [
        LessonComponent,
        ReportProblemComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        FileSaverModule,
        MatProgressBarModule,
        ToastModule,
        TooltipModule,
        ShareButtonsModule.withConfig({
            debug: true
        }),
        ShareIconsModule,
        SafePipeModule,
        OverflowBodyModule,
        DynamicDialogModule,
        OverlayPanelModule,
        InputTextareaModule,

    ],
    exports:[
        LessonComponent
    ],
    providers: [DialogService]
})
export class LessonModule { }
