import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {AppPages} from "./config/app-config";
import {UploadFilesComponent} from "./components/upload-files/upload-files.component";
import {AuthGuard} from "./shared/guard/auth.guard";

const routes: Routes = [
  { path: AppPages.login, component: SignInComponent },
  { path: AppPages.uploadFiles, component: UploadFilesComponent, canActivate:[AuthGuard] },
  { path: AppPages.seminars, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
