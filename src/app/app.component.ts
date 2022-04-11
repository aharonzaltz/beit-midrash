import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subject} from "rxjs";
import {map, shareReplay, take, takeUntil, tap} from "rxjs/operators";
import {APP_MENU_ITEMS, APP_MENU_ITEMS_FOR_MANAGER, APP_MENU_MOBILE_ITEMS} from "./config/app-config";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AppStateService} from "./services/app-state.service";
import { isMobile } from './services/app-utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

    menuItems = [...APP_MENU_ITEMS];
    mobileMenuItems = [...APP_MENU_MOBILE_ITEMS];

    data$!: Observable<any>
    private destroyed$ = new Subject<any>();

    isMobile = isMobile();

    constructor(
        private authService: AuthService,
        private router: Router,
        private appStateService: AppStateService
    ) {
    }

    ngOnInit() {

        // this.items$ = this.authService.isLoggedIn().pipe(
        //     map(val => val ? APP_MENU_ITEMS_FOR_MANAGER : APP_MENU_ITEMS)
        // )
        this.appStateService.getLessonsDataFromServer().pipe(
           take(1)
        ).subscribe();
        this.appStateService.getBooksDataFromServer().pipe(
           take(1)
        ).subscribe();
    }

    onItemClick(event: any) {

    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }


}
