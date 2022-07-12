import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Book} from "../../../interfaces/book.interfaces";
import {AppStateService} from "../../../services/app-state.service";
import {BookService} from "../services/book.service";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {APP_TITLE, BOOKS_TITLE, CONTACT_TITLE} from "../../../config/app-config";
import {Title} from "@angular/platform-browser";
import {MetaDataPageService} from "../../../services/meta-data-page.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books$!: Observable<Book[]>
  bookShown$ = this.bookService.currentBook$.pipe(map(val => !!val));

  constructor(
      private appStateService: AppStateService,
      private router: Router,
      private route: ActivatedRoute,
      private metaDataPageService: MetaDataPageService,
      private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${BOOKS_TITLE}`);
    this.books$ = this.appStateService.getBooks();
  }

  onItemClick(book: Book) {
    this.router.navigate([book.id], {relativeTo: this.route})

  }


}
