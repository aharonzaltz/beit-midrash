import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "./home-component/home.component";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {LessonComponent} from "../shared/lesson/lesson.component";
import {LessonModule} from "../shared/lesson/lesson-module";
import * as path from "path";

const routes: Route[] = [
    {path: '', component: HomeComponent, children: [
            {path: 'current-affairs/:id',  component: LessonComponent}
            // {path: ':id', component: LessonComponent}
        ]}
]

@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        CommonModule,
        LessonModule,
        RouterModule.forChild(routes),
        DividerModule,
        CardModule

    ],
    exports:[
    ],
    providers: []

})
export class HomeModule { }
