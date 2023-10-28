import {MegaMenuItem, MenuItem} from "primeng/api";
import {appMenuItem, HomeMenuItem} from "../interfaces/app.interfaces";
import {Router} from "@angular/router";
import {HomeLessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";

export const APP_TITLE = "בית מדרש הגר״א"
export const CONTACT_TITLE = "שליחת שאלה/יצירת קשר"
export const SUBSCRIBE_TITLE = "הרשמה לניוזלטר"
export const CONTACT_TITLE_MOBILE = "שאלה/הרשמה"
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
    weeklyArticle = "weekly-article",
    contact = "contact",
    subscribe = "subscribe",
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
    {label: SUBSCRIBE_TITLE, routerLink: AppPages.subscribe},
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
    {label: CONTACT_TITLE_MOBILE,  items: [
            {label: CONTACT_TITLE, routerLink: AppPages.contact},
            {label: SUBSCRIBE_TITLE, routerLink: AppPages.subscribe},
        ]},


    {label: 'חיפוש', routerLink: AppPages.search},
    {label: 'כניסה', routerLink: AppPages.login}
]

export const LEFT_HOME_MENU_ITEMS: { title: string, values: HomeLessonBackground[] }[] = [
    {
        title: 'אקטואליה', values: [
            {
                name: 'הרב אוריה עינבל - מלחמת שמחת תורה',
                packageName: '',
                url: 'harav-inbal/war',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            }
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
                name: 'הרב אוריה ענבל - שיעורי בראשית - תשע״ב',
                packageName: '',
                url: 'harav-inbal/chumash-lessons-772/lessons/bereshit',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            }

        ]
    },
    {
        title: 'סדרות חדשות',
        values: [
            {
                name: 'נטע בתוכינו - תורה שבעל פה',
                packageName: '',
                url: 'harav-inbal/nota-betochenu-torah-shebaal-peh',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'דרכי חכמים',
                packageName: '',
                url: 'harav-inbal/sageWays',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'אמונה וביטחון',
                packageName: '',
                url: 'harav-inbal/faith-and-trust',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'המצוות',
                packageName: '',
                url: 'harav-inbal/commandments',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
        ]

    }
]


export const RIGHT_HOME_MENU_ITEMS: HomeMenuItem[] = [
    {label: 'מאמרי בית המדרש', routerLink: AppPages.articles, icon: 'pi pi-book'},
    {label: 'נקודות בלימוד רמב״ן על התורה', routerLink: AppPages.learnRamban, icon: 'pi pi-book'},
    {title: 'חדש!', label: 'מבי מדרשא - מאמר שבועי', routerLink: AppPages.weeklyArticle, icon: 'pi pi-book', class: 'new-item'},
    {title: 'חדש!', label: 'ספר זיכרון מכבדי אכבד - קישור לרכישה', url: "https://nedar.im/rvRq", icon: 'pi pi-book', class: 'new-item'},
    {title: 'חדש!', label: 'ספר  בית נביא שמואל - קישור לרכישה', url: "https://nedar.im/dFcW", icon: 'pi pi-book', class: 'new-item'},

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
    {label: 'תרומה לאתר', url: "https://nedar.im/jzdr", icon: 'pi pi-database'},
]


