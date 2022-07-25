import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {QuestionsAndAnswersComponent} from "./q&a-component/questions-and-answers.component";


const routes: Route[] = [
    {path: '', component: QuestionsAndAnswersComponent}
]

@NgModule({
    declarations: [
        QuestionsAndAnswersComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports:[
    ],
    providers: []

})
export class QAModule { }
