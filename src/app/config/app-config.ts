import {MegaMenuItem, MenuItem} from "primeng/api";
import {appMenuItem, HomeMenuItem} from "../interfaces/app.interfaces";
import {Router} from "@angular/router";
import {HomeLessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";

export const APP_TITLE = "בית מדרש הגר״א"
export const CONTACT_TITLE = "שליחת שאלה/יצירת קשר"
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
    qa = "q&a",
    search = "search",
}

export const APP_MENU_ITEMS: appMenuItem[] = [
    {label: 'דף הבית', routerLink: AppPages.home},
    {label: 'הרב אוריה עינבל', routerLink: AppPages.haravInbal},
    {label: 'ימי עיון', routerLink: AppPages.seminars},
    {label: 'בית המדרש', routerLink: AppPages.beitMidrash},
    {label: 'ישיבת המשך הזמן', routerLink: AppPages.hemshechHazman},
    {label: 'ספרי בית המדרש', routerLink: AppPages.books},
    {label: CONTACT_TITLE, routerLink: AppPages.contact},
    // {label: 'שאלות ותשובות', routerLink: AppPages.qa},
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
    // {
    //     label: 'שו״ת', items: [
    //         {label: CONTACT_TITLE, routerLink: AppPages.contact},
    //         {label: 'שאלות ותשובות', routerLink: AppPages.qa},
    //     ]
    // },

    {label: 'חיפוש', routerLink: AppPages.search},
    {label: 'כניסה', routerLink: AppPages.login}
]

export const LEFT_HOME_MENU_ITEMS: { title: string, values: HomeLessonBackground[] }[] = [
    {
        title: 'אקטואליה', values: [

        ]
    }, {
        title: 'פרשת השבוע', values: [
            {
                name: 'בית המדרש - בראשית',
                packageName: '',
                url: 'beit-midrash/mikra/lessons/bereshit',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה ענבל - שיעורי חומש - בראשית',
                packageName: '',
                url: 'harav-inbal/chumash-lessons/lessons/bereshit',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה ענבל - שיעורי חומש - בראשית - תשע״ב',
                packageName: '',
                url: 'harav-inbal/chumash-lessons-772/lessons/bereshit',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },

        ]
    },
    {
        title: 'שיעורים חדשים',
        values: [
            {
                name: 'קורס גיור - סדרה חדשה - א - בראשית ברא',
                packageName: '',
                url: 'harav-inbal/judaismBasics/3771323a-1543-42b3-b5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'קורס גיור - סדרה חדשה - ב - אנכי',
                packageName: '',
                url: 'harav-inbal/judaismBasics/3771323a-1543-12b3-b5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'קורס גיור - סדרה חדשה - ג - ואף גם זאת',
                packageName: '',
                url: 'harav-inbal/judaismBasics/3771523a-1543-42b3-b5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'קורס גיור - סדרה חדשה - ד - אשר חלק להם',
                packageName: '',
                url: 'harav-inbal/judaismBasics/3771593a-1543-42b3-b5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },

        ]

    }
]


export const RIGHT_HOME_MENU_ITEMS: HomeMenuItem[] = [
    {label: 'מאמרי בית המדרש', routerLink: AppPages.articles, icon: 'pi pi-book'},
    {label: 'נקודות בלימוד רמב״ן על התורה', routerLink: AppPages.learnRamban, icon: 'pi pi-book'},
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


