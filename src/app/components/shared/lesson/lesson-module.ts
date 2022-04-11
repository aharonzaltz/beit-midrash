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

@NgModule({
    declarations: [
        LessonComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        FileSaverModule,
        MatProgressBarModule,
        ToastModule,
        ShareButtonsModule.withConfig({
            debug: true
        }),
        ShareIconsModule,
        SafePipeModule,
        OverflowBodyModule
    ],
    exports:[
        LessonComponent
    ],
    providers: []
})
export class LessonModule { }
