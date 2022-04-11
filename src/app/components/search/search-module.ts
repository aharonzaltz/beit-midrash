import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {SearchComponent} from "./search/search.component";
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from 'primeng/button';
import {SearchService} from "./search/search.service";

const routes: Route[] = [
    {
        path: '', component: SearchComponent
    }
]

@NgModule({
    declarations: [
        SearchComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        InputTextModule,
        ButtonModule

    ],
    exports: [],
    providers: []

})
export class SearchModule {}
