import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Articles, BeitMidrash, HaravInbal, SeminarsPages} from "./config/seminars.config";
import {SeminarsBaseComponent} from "./seminars-base/seminars-base.component";
import {SeminarsComponent} from "./seminars-base/seminars/seminars.component";
import {LessonComponent} from "../shared/lesson/lesson.component";

const routes: Routes = [
    {path: '', component: SeminarsBaseComponent},
    ...Object.values(SeminarsPages).map(path => ({path, component: SeminarsComponent, children: [
            {path: ':id', component: LessonComponent}
        ]})),
    ...Object.values(HaravInbal).map(path => ({path, component: SeminarsComponent, children: [
            {path: ':id', component: LessonComponent}
        ]})),
    ...Object.values(BeitMidrash).map(path => ({path, component: SeminarsComponent, children: [
            {path: ':id', component: LessonComponent}
        ]})),
    ...Object.values(Articles).map(path => ({path, component: SeminarsComponent, children: [
            {path: ':id', component: LessonComponent}
        ]})),


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeminarsRoutingModule {
}
