import { Component } from '@angular/core';
import {combineLatest, Observable, of} from "rxjs";
import {map, shareReplay, tap} from "rxjs/operators";
import {APP_MENU_ITEMS, APP_MENU_ITEMS_FOR_MANAGER} from "./config/app-config";
import {AuthService} from "./services/auth.service";
import {MenuItem} from "primeng/api";
import {appMenuItem} from "./interfaces/app.interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items$!: Observable<appMenuItem[]>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {

   this.items$ = this.authService.isLoggedIn().pipe(
     map(val => val ?APP_MENU_ITEMS_FOR_MANAGER: APP_MENU_ITEMS)
   )
  }

  onItemClick(event: any) {

  }
}
