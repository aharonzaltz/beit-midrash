import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable, of, Subject} from "rxjs";
import {map, shareReplay, take, takeUntil, tap} from "rxjs/operators";
import {APP_MENU_ITEMS, APP_MENU_MOBILE_ITEMS, APP_TITLE, AppPages} from "./config/app-config";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AppStateService} from "./services/app-state.service";
import { isMobile } from './services/app-utils.service';
import {MenuItem} from "primeng/api";
import {SeminarsService} from "./components/seminars/seminars-base/services/seminars.service";
import {Title} from "@angular/platform-browser";
import {environment} from "../environments/environment.prod";
import {MetaDataPageService} from "./services/meta-data-page.service";
import {AppDialog} from "./interfaces/app.interfaces";
import {AppDialogService} from "./services/app-dialog.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{

    menuItems$!: Observable<MenuItem[]>;
    mobileMenuItems$! : Observable<MenuItem[]> ;
    isLoggedIn$ = this.authService.isLoggedIn();

    @ViewChild('page') page!: ElementRef<any>;

    private destroyed$ = new Subject<any>();

    isMobile = isMobile();
    showDialog = false;
    displayDialog$: Observable<AppDialog | null> = this.appDialogService.getDialogData$.pipe(
        tap(val => this.showDialog = !!val)
    );


    constructor(
        private authService: AuthService,
        private seminarsService: SeminarsService,
        private router: Router,
        private metaDataPageService: MetaDataPageService,
        private appDialogService: AppDialogService,
        private appStateService: AppStateService
    ) {

        if (environment.production) console.log = () => {}

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

    onItemClick(item: {item: MenuItem, originalEvent: Event}) {
        this.seminarsService.setLessonBackground(null);
        setTimeout(() => {
            this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${item.item.label || ''}`);
        }, 100)

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

    onHideDialog() {
        this.appDialogService.hideDialog();
    }
}
