import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SeminarsPages} from "./config/seminars.config";
import {SeminarsBaseComponent} from "./seminars-base/seminars-base.component";
import {SeminarsComponent} from "./seminars-base/seminars/seminars.component";

const routes: Routes = [
    {path: '', component: SeminarsBaseComponent},
    ...Object.keys(SeminarsPages).map(path => ({path, component: SeminarsComponent}))

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SeminarsRoutingModule {
}
