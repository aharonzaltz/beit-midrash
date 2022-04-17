import {MegaMenuItem, MenuItem} from "primeng/api";
import {appMenuItem} from "../interfaces/app.interfaces";
import {Router} from "@angular/router";
import {HomeLessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";

export enum AppPages {
    login = "auth",
    home = "home",
    uploadFiles = "uploadFiles",
    haravInbal = "harav-inbal",
    seminars = "seminars",
    beitMidrash = "beit-midrash",
    hemshechHazman = "hemshech-hazman",
    books = "books",
    articles = "articles",
    contact = "contact",
    search = "search",
}

export const APP_MENU_ITEMS: appMenuItem[] = [
    {label: 'דף הבית', routerLink: AppPages.home},
    {label: 'הרב אוריה עינבל', routerLink: AppPages.haravInbal},
    {label: 'ימי עיון', routerLink: AppPages.seminars},
    {label: 'בית המדרש', routerLink: AppPages.beitMidrash},
    {label: 'ישיבת המשך הזמן', routerLink: AppPages.hemshechHazman},
    {label: 'ספרי בית המדרש', routerLink: AppPages.books},
    {label: 'צור קשר', routerLink: AppPages.contact},
    {label: 'חיפוש', routerLink: AppPages.search},
    {label: 'כניסה', routerLink: AppPages.login}
]

export const APP_MENU_MOBILE_ITEMS: MenuItem[] = [
    {label: 'דף הבית', routerLink: AppPages.home},
    {label: 'הרב אוריה עינבל', routerLink: AppPages.haravInbal},
    {
        label: 'בית המדרש',  items: [
            {label: 'בית המדרש', routerLink: AppPages.beitMidrash},
            {label: 'ימי עיון', routerLink: AppPages.seminars},
            {label: 'ישיבת המשך הזמן', routerLink: AppPages.hemshechHazman},
            {label: 'ספרי בית המדרש', routerLink: AppPages.books},
        ]
    },
    {label: 'צור קשר', routerLink: AppPages.contact},
    {label: 'חיפוש', routerLink: AppPages.search},
    {label: 'כניסה', routerLink: AppPages.login}
]

export const LEFT_HOME_MENU_ITEMS: {title: string, values: HomeLessonBackground[]}[] = [
    {title: 'אקטואליה', values: [
            {
                name: 'אל הלקח ארון האלוקים אדר ב׳ תשפ״ב',
                packageName: '',
                url: 'harav-inbal/others/3771353a-5543-42b3-b5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'פסח',
                packageName: '',
                url: 'harav-inbal/moadim/lessons/pesach',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },

        ]}
]

export const RIGHT_HOME_MENU_ITEMS: MenuItem[] = [
    {label: 'מאמרי בית המדרש', routerLink: AppPages.articles, icon: 'pi pi-book'},
    {label: 'תרומה לאתר', url: "https://www.matara.pro/nedarimplus/online/?mosad=7000872", icon: 'pi pi-database'},
]


