import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {LessonComponent} from "./lesson.component";

@NgModule({
    declarations: [
        LessonComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports:[
        LessonComponent
    ]
})
export class LessonModule { }
