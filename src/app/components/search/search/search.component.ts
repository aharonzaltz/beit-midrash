import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {InputText} from "primeng/inputtext/inputtext";
import {fromEvent, Observable} from "rxjs";
import {SearchService} from "./search.service";
import {Lesson} from "../../../interfaces/lessons-interfaces";
import {Router} from "@angular/router";
import {skipWhile, switchMap, take} from "rxjs/operators";

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
      private router: Router
  ) { }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch() {

    this.resultData$ = this.searchValue$.pipe(
        take(1),
        skipWhile(val => !val),
        switchMap(searchValue => this.searchService.onSearch(searchValue!)))
  }

  onResultItemClick(item: Lesson) {
    this.router.navigate([item.path])
  }

  onInputChange(event: Event) {
    this.searchService.setSearchValue((event.target! as HTMLInputElement).value)
  }
}
