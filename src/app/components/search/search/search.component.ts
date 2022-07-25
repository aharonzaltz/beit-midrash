import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InputText} from "primeng/inputtext/inputtext";
import {fromEvent, Observable} from "rxjs";
import {SearchService} from "./search.service";
import {Lesson} from "../../../interfaces/lessons-interfaces";
import {Router} from "@angular/router";
import {skipWhile, switchMap, take, tap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {APP_TITLE, BOOKS_TITLE, SEARCH_TITLE} from "../../../config/app-config";
import {MetaDataPageService} from "../../../services/meta-data-page.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchValue$ = this.searchService.searchValue$;
  resultData$!: Observable<Lesson[]>

  constructor(
      private searchService: SearchService,
      private metaDataPageService: MetaDataPageService,
      private router: Router
  ) { }

  ngOnInit(): void {
    this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${SEARCH_TITLE}`);
    this.onSearch();
  }

  onSearch(searchByTopic = false) {

    this.resultData$ = this.searchValue$.pipe(
        take(1),
        skipWhile(val => !val),
        switchMap(searchValue => this.searchService.onSearch(searchValue!, searchByTopic)),
        tap(val => {
          console.log(val)
        })
    )
  }

  onResultItemClick(item: Lesson) {
    this.router.navigate([item.path]);
  }

  onInputChange(event: Event) {
    this.searchService.setSearchValue((event.target! as HTMLInputElement).value)
  }
}
