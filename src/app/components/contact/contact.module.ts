import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ContactComponent} from "./contact/contact.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from 'primeng/inputtext';

import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from "primeng/button";
import {Route, RouterModule} from "@angular/router";
import {ContactService} from "./contact/contact.service";

const routes: Route[] = [
    {path: '', component: ContactComponent}
]

@NgModule({
    declarations: [
        ContactComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        RouterModule.forChild(routes),
        InputTextareaModule,
        ButtonModule

    ],
    exports:[
    ],
    providers: [ContactService]

})
export class ContactModule { }
