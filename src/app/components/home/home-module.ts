import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {HomeComponent} from "./home-component/home.component";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {
    RightMenuItemClassDirective,
    RightMenuItemClassDirectiveModule
} from "../../directives/right-menu-item-class.directive";
import {DialogModule} from "primeng/dialog";


const routes: Route[] = [
    {path: '', component: HomeComponent}
]

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DividerModule,
        RightMenuItemClassDirectiveModule,
        CardModule,
        DialogModule

    ],
    exports:[
    ],
    providers: []

})
export class HomeModule { }
