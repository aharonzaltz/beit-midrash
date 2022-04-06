import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Route, RouterModule} from "@angular/router";
import {BooksComponent} from "./books/books.component";
import {CardModule} from "primeng/card";
import {BookItemComponent} from "./book-item/book-item.component";
import {BookService} from "./services/book.service";
import {SafePipeModule} from "../../pipes/safe.pipe";

const routes: Route[] = [
    {
        path: '', component: BooksComponent, children: [
            {path: ':id', component: BookItemComponent}
        ]
    }
]

@NgModule({
    declarations: [
        BooksComponent,
        BookItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SafePipeModule,
        CardModule

    ],
    exports: [],
    providers: [BookService]

})
export class BooksModule {
}
