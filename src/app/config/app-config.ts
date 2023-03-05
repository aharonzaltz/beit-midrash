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
            {
                name: 'רבני בית המדרש - זום פורים',
                packageName: '',
                url: 'beit-midrash/purim/3271313a-5549-42b3-b5fd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה עינבל - פורים',
                packageName: '',
                url: 'harav-inbal/moadim/lessons/purim',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב רפאל ספייער - דניאל ואסתר חנוכה ופורים',
                packageName: '',
                url: 'beit-midrash/neviim/lessons/daniel/3771311a-5512-42b3-b5fd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
        ]
    }, {
        title: 'פרשת השבוע', values: [
            {
                name: 'בית המדרש - שמות',
                packageName: '',
                url: 'beit-midrash/mikra/lessons/shmot',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה ענבל - שיעורי חומש - שמות',
                packageName: '',
                url: 'harav-inbal/chumash-lessons/lessons/shemot',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה ענבל - שיעורי חומש - שמות - תשע״ב',
                packageName: '',
                url: 'harav-inbal/chumash-lessons-772/lessons/shemot',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },

        ]
    },
    {
        title: 'שיעורים חדשים',
        values: [
            {
                name: 'תקופות הנבואה - התבן והבר',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-0546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'שערים אל הפנימיות - כל התורה הוא הדרש',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-9546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'צלם ודמות',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-8546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'משל ונמשל',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-7546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'מוסר בתפיסת הדורות - מאלילות עד פוסט',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-6546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'ללמוד עיתון - ישמעאל',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-5546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'ללמוד מהשורש לפרי - הקדמה',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-4546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'יסוד ההתלבשות',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-3546-12b3-l5cd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'ייאוש ומחילה - חומר ויחס',
                packageName: '',
                url: 'harav-inbal/spirit-and-physicality/3771323a-2546-12b3-l5cd-182772672ef7',
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


