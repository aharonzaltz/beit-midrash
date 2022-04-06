import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Book} from "../../../interfaces/book.interfaces";
import {AppStateService} from "../../../services/app-state.service";
import {BookService} from "../services/book.service";
import {map} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

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
      private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.books$ = this.appStateService.getBooks();
  }

  onItemClick(book: Book) {
    this.router.navigate([book.id], {relativeTo: this.route})

  }


}
