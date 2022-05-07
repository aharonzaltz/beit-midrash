import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Observable, of, Subject} from "rxjs";
import {map, shareReplay, take, takeUntil, tap} from "rxjs/operators";
import {APP_MENU_ITEMS, APP_MENU_MOBILE_ITEMS, AppPages} from "./config/app-config";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AppStateService} from "./services/app-state.service";
import { isMobile } from './services/app-utils.service';
import {MenuItem} from "primeng/api";
import {SeminarsService} from "./components/seminars/seminars-base/services/seminars.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{

    menuItems$!: Observable<MenuItem[]>;
    mobileMenuItems$! : Observable<MenuItem[]> ;
    isLoggedIn$ = this.authService.isLoggedIn() ;

    private destroyed$ = new Subject<any>();

    isMobile = isMobile();

    constructor(
        private authService: AuthService,
        private seminarsService: SeminarsService,
        private router: Router,
        private appStateService: AppStateService
    ) {
    }

    ngAfterViewInit(): void {

    }

    ngOnInit() {

        this.menuItems$ = this.authService.isLoggedIn().pipe(
            map(isLoggedIn => {
                const menuItems = APP_MENU_ITEMS;
                this.addCommandToMenuItem(menuItems);
                return menuItems.filter(item => !isLoggedIn || item.routerLink !== AppPages.login)
            })
        )

        this.mobileMenuItems$ = this.authService.isLoggedIn().pipe(
            map(isLoggedIn => {
                const menuItems = APP_MENU_MOBILE_ITEMS;
                this.addCommandToMenuItem(menuItems);
                return menuItems.filter(item => !isLoggedIn || item.routerLink !== AppPages.login)
            })
        )

        this.appStateService.getLessonsDataFromServer().pipe(
           take(1)
        ).subscribe();
        this.appStateService.getBooksDataFromServer().pipe(
           take(1)
        ).subscribe();
    }
    private addCommandToMenuItem(menuItems: MenuItem[]) {
        menuItems.forEach(menuItem => menuItem.command = this.onItemClick.bind(this))
    }

    onItemClick() {
        this.seminarsService.setLessonBackground(null);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }


    onLogout() {
        this.authService.signOut().pipe(
            take(1)
        ).subscribe();
    }
}
