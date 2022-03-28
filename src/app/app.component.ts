import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable, of} from "rxjs";
import {map, shareReplay, take, tap} from "rxjs/operators";
import {APP_MENU_ITEMS, APP_MENU_ITEMS_FOR_MANAGER} from "./config/app-config";
import {AuthService} from "./services/auth.service";
import {MenuItem} from "primeng/api";
import {appMenuItem} from "./interfaces/app.interfaces";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AppStateService} from "./services/app-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  items$!: Observable<appMenuItem[]>;

  data$!: Observable<any>

  constructor(
    private authService: AuthService,
    private router: Router,
    private angularFireDatabase: AngularFireDatabase,
    private appStateService: AppStateService
  ) {
  }

  ngOnInit() {

   this.items$ = this.authService.isLoggedIn().pipe(
     map(val => val ?APP_MENU_ITEMS_FOR_MANAGER: APP_MENU_ITEMS)
   )
      this.appStateService.getDataFromServer(this.angularFireDatabase).subscribe();
  }

  onItemClick(event: any) {

  }



}
