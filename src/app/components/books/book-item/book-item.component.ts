import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {map, switchMap, tap} from "rxjs/operators";
import {decodeText} from "../../../services/app-utils.service";
import {Observable} from "rxjs";
import {Book} from "../../../interfaces/book.interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AppStateService} from "../../../services/app-state.service";
import {MetaDataPageService} from "../../../services/meta-data-page.service";

@Component({
    selector: 'app-book-item',
    templateUrl: './book-item.component.html',
    styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {

    book$!: Observable<Book>;
    id!: string;

    constructor(
        private appStateService: AppStateService,
        private bookService: BookService,
        private route: ActivatedRoute,
        private router: Router,
        private metaDataPageService: MetaDataPageService
    ) {
    }

    ngOnInit(): void {
        this.getBook();
    }

    private getBook() {
        this.book$ = this.route.parent!.url.pipe(
            map(val => this.router.url.split('/').filter(item => !!item)),
            tap(pathBase => {
                this.id = pathBase[pathBase.length - 1];
            }),
            switchMap(pathBase => {
                return this.appStateService.getBookById(this.id)
            }),
            tap(book => {
                this.metaDataPageService.changeMetaData(book.name);
                this.bookService.setCurrentBook(book.id);
            })
        )
    }

    ngOnDestroy(): void {
        this.bookService.setCurrentBook(null);
    }
}
