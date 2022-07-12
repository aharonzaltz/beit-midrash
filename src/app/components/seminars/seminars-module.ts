import { NgModule } from '@angular/core';
import {SeminarsBaseComponent} from "./seminars-base/seminars-base.component";
import {SeminarsRoutingModule} from "./seminars-routing.module";
import {CommonModule} from "@angular/common";
import {SeminarsComponent} from "./seminars-base/seminars/seminars.component";
import {LessonModule} from "../shared/lesson/lesson-module";
import {CardModule} from 'primeng/card';
import {ButtonModule} from "primeng/button";
import {ScrollToTopDirectiveModule} from "../../directives/scroll-to-top.directive";

@NgModule({
    declarations: [
        SeminarsBaseComponent,
        SeminarsComponent
    ],
    imports: [
        CommonModule,
        SeminarsRoutingModule,
        LessonModule,
        ButtonModule,
        ScrollToTopDirectiveModule,
        CardModule

    ],
    providers: []
})
export class SeminarsModule { }
