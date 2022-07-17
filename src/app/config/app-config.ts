import {MegaMenuItem, MenuItem} from "primeng/api";
import {appMenuItem, HomeMenuItem} from "../interfaces/app.interfaces";
import {Router} from "@angular/router";
import {HomeLessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";

export const APP_TITLE = "בית מדרש הגר״א"
export const CONTACT_TITLE = "צור קשר"
export const SEARCH_TITLE = "חיפוש"
export const BOOKS_TITLE = "ספרי בית המדרש"

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
    learnRamban = "learn-ramban",
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
        label: 'בית המדרש', items: [
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

export const LEFT_HOME_MENU_ITEMS: { title: string, values: HomeLessonBackground[] }[] = [
    {
        title: 'אקטואליה', values: [
            {
                name: ' הרב אוריה עינבל - ימי בין המצרים',
                packageName: '',
                url: 'harav-inbal/moadim/lessons/tisha-beav/1121513a-5143-41b3-b5cd-181772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            }
        ]
    }, {
        title: 'פרשת השבוע', values: [
            {
                name: 'בית המדרש - במדבר',
                packageName: '',
                url: 'beit-midrash/mikra/lessons/bamidbar',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה עינבל - שיעורים על ספר במדבר',
                packageName: '',
                url: 'harav-inbal/torah-fundamentals/lessons/bamidbar',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },

        ]
    },
    {
        title: 'שיעורים חדשים',
        values: [
            {
                name: 'הנשירה',
                packageName: '',
                url: 'harav-inbal/approach-to-dropout',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'לימוד החומש ומפרשיו - ניסן תשפ״ב',
                packageName: '',
                url: 'seminars/learn-mikra',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'מדינה ויהדות - צפיה',
                packageName: '',
                url: 'harav-inbal/state-and-judaism',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
        ]

    }
]


export const RIGHT_HOME_MENU_ITEMS: HomeMenuItem[] = [
    {label: 'מאמרי בית המדרש', routerLink: AppPages.articles, icon: 'pi pi-book'},
    {label: 'נקודות בלימוד רמב״ן על התורה', routerLink: AppPages.learnRamban, icon: 'pi pi-book'},
    {
        label: 'שבת התאחדות פרשת פינחס', isDialog: true,
        header: 'הרב ר\' יואל שוורץ מודיע:\n', content: [
            "ב\"ה עלה בידינו לארגן שבת התאחדות עיון בתורת ארץ ישראל בשב\"ק פ' פינחס הבעל\"ט י\"ז בתמוז ביישוב בת עין ב' (בגבעה למטה)",
            "העלות 250 ש''ח לאיש אפשר גם משפחות לבירורים והרשמה: ר' יואל שוורץ 0527656405"
        ]
    },
    {
        label: 'בית המדרש לב לדעת', isDialog: true,
        header: 'בית המדרש לב לדעת\n' +
            'סדר ג\' בישיבת דרך ה\'\n' +
            '(רחוב אבן דנאן 1 פינת חי טייב הר נוף)', content: [
            "בעז''ה מתקיים בישיבתנו בכל ערב בסדר ג' סדר לימוד ברמב''ן על התורה\n" +
            "הסדר נפתח במראי מקומות ושיעור בשעה 21:00 ע''י הרב אוריה עינבל\n" +
            "\n" +
            "לאחר מכן סדר לימוד עד 22:15\n" +
            "ובשעה 22:15 שיעור סיכום",

            "השיעור ב22:15 נמסר על ידי רבני הישיבה לפי ימים :\n" +
            "ביום א' הרב ברוך צבי גרינבוים ראש הישיבה.\n" +
            "ביום ב' הרב אוריה עינבל ר''מ בישיבה.\n" +
            "ביום ג' הרב ברוך צבי גרינבוים ראש הישיבה.\n" +
            "ביום ד' הרב אליהו מאיר פיבלזון ר''מ בישיבה.\n" +
            "ביום ה' הרב אוריה עינבל ר''מ בישיבה.",
            "אפשר לקבל במייל מראי מקומות והערות",
        ]
    },
    {label: 'תרומה לאתר', url: "https://www.matara.pro/nedarimplus/online/?mosad=7000872", icon: 'pi pi-database'},
]


