import { NgModule } from '@angular/core';
import {SeminarsBaseComponent} from "./seminars-base/seminars-base.component";
import {SeminarsRoutingModule} from "./seminars-routing.module";
import {CommonModule} from "@angular/common";
import {SeminarsComponent} from "./seminars-base/seminars/seminars.component";
import {LessonModule} from "../shared/lesson/lesson-module";

@NgModule({
    declarations: [
        SeminarsBaseComponent,
        SeminarsComponent
    ],
    imports: [
        CommonModule,
        SeminarsRoutingModule,
        LessonModule
    ],
})
export class SeminarsModule { }
