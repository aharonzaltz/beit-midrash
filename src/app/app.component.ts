import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {combineLatest, Observable, Subject} from "rxjs";
import {filter, map, take, tap} from "rxjs/operators";
import {APP_MENU_ITEMS, APP_MENU_MOBILE_ITEMS, APP_TITLE, AppPages} from "./config/app-config";
import {AuthService} from "./services/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {AppStateService} from "./services/app-state.service";
import {isMobile} from './services/app-utils.service';
import {MenuItem} from "primeng/api";
import {SeminarsService} from "./components/seminars/seminars-base/services/seminars.service";
import {environment} from "../environments/environment.prod";
import {MetaDataPageService} from "./services/meta-data-page.service";
import {AppDialog} from "./interfaces/app.interfaces";
import {AppDialogService} from "./services/app-dialog.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

    menuItems$!: Observable<MenuItem[]>;
    mobileMenuItems$!: Observable<MenuItem[]>;
    isLoggedIn$ = this.authService.isLoggedIn();

    @ViewChild('page') page!: ElementRef<any>;

    private destroyed$ = new Subject<any>();

    isMobile = isMobile();
    showDialog = false;
    displayDialog$: Observable<AppDialog | null> = this.appDialogService.getDialogData$.pipe(
        tap(val => this.showDialog = !!val)
    );
    activeItem!: MenuItem;

    constructor(
        private authService: AuthService,
        private seminarsService: SeminarsService,
        private router: Router,
        private metaDataPageService: MetaDataPageService,
        private appDialogService: AppDialogService,
        private appStateService: AppStateService
    ) {

        if (environment.production) console.log = () => {
        }

    }

    ngAfterViewInit(): void {


    }

    ngOnInit() {
        localStorage.clear();
        setTimeout(() => {
            localStorage.clear();
        }, 2000)
        this.menuItems$ = combineLatest([
            this.authService.isLoggedIn(),
            this.router.events
        ]).pipe(
            filter(([isLoggedIn, routerEvent]) => this.router.url !== '/' && routerEvent instanceof NavigationEnd),
            map(([isLoggedIn, routerEvent]) => {
                const menuItems = APP_MENU_ITEMS;
                this.addCommandToMenuItem(menuItems);
                const menuItemsFiltered = menuItems.filter(item => !isLoggedIn || item.routerLink !== AppPages.login);
                this.activeItem = menuItems.find(item => this.router.url.includes(item.routerLink!)) || menuItemsFiltered[0];
                return menuItemsFiltered;
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

    onItemClick(event: { item: MenuItem, originalEvent: Event }) {
        this.activeItem = event.item;
        this.seminarsService.setLessonBackground(null);
        setTimeout(() => {
            this.metaDataPageService.changeMetaData(`${APP_TITLE} - ${event.item.label || ''}`);
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
