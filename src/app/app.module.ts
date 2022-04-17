import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/login-module/sign-in/sign-in.component';
import {TabMenuModule} from "primeng/tabmenu";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {FileSaverModule} from "ngx-filesaver";
import {getSaver, SAVER} from "./services/saver.provider";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";

@NgModule({
  declarations: [
    AppComponent,
    UploadFilesComponent
  ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TabMenuModule,
        MenubarModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAnalyticsModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        HttpClientModule,
        FileSaverModule,
        ToastModule,
        InputTextModule,
        ReactiveFormsModule,
    ],
  providers: [
    MessageService,
    {provide: SAVER, useFactory: getSaver}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
