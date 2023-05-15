import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/login-module/sign-in/sign-in.component';
import {AppPages} from "./config/app-config";
import {UploadFilesComponent} from "./components/upload-files/upload-files.component";
import {AuthGuard} from "./shared/guard/auth.guard";
import {LoginModule} from "./components/login-module/login.module";
import {QAModule} from "./components/questions-and-answers/q&a-module";

const routes: Routes = [
  {path: AppPages.home, loadChildren: () => import("./components/home/home-module").then(m => m.HomeModule)},
  { path: AppPages.login, loadChildren: ()  => import('./components/login-module/login.module').then(m => m.LoginModule)},
  { path: AppPages.uploadFiles, component: UploadFilesComponent, canActivate:[AuthGuard] },
  { path: AppPages.seminars, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.hemshechHazman, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.haravInbal, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.beitMidrash, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.contact, loadChildren: () => import("./components/contact/contact.module").then(m => m.ContactModule)},
  { path: AppPages.qa, loadChildren: () => import("./components/questions-and-answers/q&a-module").then(m => m.QAModule)},
  { path: AppPages.books, loadChildren: () => import("./components/books/books-module").then(m => m.BooksModule)},
  { path: AppPages.articles, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.learnRamban, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.weeklyArticle, loadChildren: () => import("./components/seminars/seminars-module").then(m => m.SeminarsModule)},
  { path: AppPages.search, loadChildren: () => import("./components/search/search-module").then(m => m.SearchModule)},
  {path: '', redirectTo: AppPages.home, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
