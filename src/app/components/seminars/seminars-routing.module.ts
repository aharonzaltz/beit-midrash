import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SeminarsBaseComponent} from "./seminars-base/seminars-base.component";
import {SeminarsComponent} from "./seminars-base/seminars/seminars.component";
import {LessonComponent} from "../shared/lesson/lesson.component";

const routes: Routes = [
    {path: '', component: SeminarsBaseComponent},
    {
        path: ':lessonType', component: SeminarsComponent, children: [
            {path: ':id', component: LessonComponent}
        ]
    },
    {
        path: ':lessonType/lessons/:lessonId', component: SeminarsComponent, children: [
            {path: ':id', component: LessonComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeminarsRoutingModule {
}
