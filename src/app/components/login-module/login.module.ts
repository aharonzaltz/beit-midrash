import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {SignInComponent} from "./sign-in/sign-in.component";
import {Route, RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Route[] = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login',  component: SignInComponent },
    { path: 'register-user', component: SignUpComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent }
]

@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        ForgotPasswordComponent,
        VerifyEmailComponent
    ],
    imports: [
        CommonModule,
        InputTextModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        ButtonModule
    ],
    providers: [],
    bootstrap: []
})
export class LoginModule { }
