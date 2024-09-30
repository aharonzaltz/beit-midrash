import {MegaMenuItem, MenuItem} from "primeng/api";
import {appMenuItem, HomeMenuItem} from "../interfaces/app.interfaces";
import {Router} from "@angular/router";
import {HomeLessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";

export const APP_TITLE = "בית מדרש הגר״א"
export const CONTACT_TITLE = "שליחת שאלה/יצירת קשר"
export const SUBSCRIBE_TITLE = "הרשמה למאמר השבועי"
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
                name: 'הרב אוריה ענבל - ראש השנה',
                packageName: '',
                url: 'harav-inbal/moadim/lessons/roshHashana',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'זום ראש השנה - תשפ״ד (שנה שעברה)',
                packageName: '',
                url: 'beit-midrash/rosh-hashana-783/3271313a-5549-42b3-b5fd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'זום יום כיפור - תשפ״ד (שנה שעברה)',
                packageName: '',
                url: 'beit-midrash/yom-kipur-783/3271313a-5549-42b3-b5fd-182772672ef7',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה עינבל - סדרת שיעורים בארה״ב - אדר תשפ״ד',
                packageName: '',
                url: 'harav-inbal/us-3',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה עינבל - מלחמת שמחת תורה',
                packageName: '',
                url: 'harav-inbal/war',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },

        ]
    }, {
        title: 'פרשת השבוע', values: [
            {
                name: 'בית המדרש - דברים',
                packageName: '',
                url: 'beit-midrash/mikra/lessons/devarim',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה ענבל - שיעורי חומש - דברים',
                packageName: '',
                url: 'harav-inbal/chumash-lessons/lessons/devarim',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            },
            {
                name: 'הרב אוריה ענבל - שיעורי דברים - תשע״ב',
                packageName: '',
                url: 'harav-inbal/chumash-lessons-772/lessons/devarim',
                background: 'https://seminars-hagra.s3.amazonaws.com/baal-shem-tov/baal-shem-tov.jpeg'
            }

        ]
    },
    {
        title: 'סדרות חדשות',
        values: [
            {
                name: 'דיני ממונות',
                packageName: '',
                url: 'harav-inbal/momonos',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'בסדרי התפילה',
                packageName: '',
                url: 'harav-inbal/tfila',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'אגרות צפון חלק שני',
                packageName: '',
                url: 'harav-inbal/igrot-tzafon',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'דרך עץ החיים',
                packageName: '',
                url: 'harav-inbal/derech-etzh-hachaim',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'תורת הציבור',
                packageName: '',
                url: 'harav-inbal/torat-momonos',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'תניא',
                packageName: '',
                url: 'harav-inbal/tanya',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'הסבל',
                packageName: '',
                url: 'harav-inbal/hasevel',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'העמידה',
                packageName: '',
                url: 'harav-inbal/haamida',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'נס וטבע',
                packageName: '',
                url: 'harav-inbal/nes-veteva',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'טהרה',
                packageName: '',
                url: 'harav-inbal/thaara',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'ציון',
                packageName: '',
                url: 'harav-inbal/tzion',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'הבינוני',
                packageName: '',
                url: 'harav-inbal/habenoni',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'הנייטרליות',
                packageName: '',
                url: 'harav-inbal/neutrality',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'ה׳ הוא האלוקים',
                packageName: '',
                url: 'harav-inbal/hasem',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
            {
                name: 'האמת והשלום',
                packageName: '',
                url: 'harav-inbal/true-and-peace',
                background: 'https://seminars-hagra.s3.amazonaws.com/written-torah/tora-image.jpeg'
            },
        ]

    }
]


export const RIGHT_HOME_MENU_ITEMS: HomeMenuItem[] = [
    // {title: '', label: 'מסע הרב אוריה עינבל לארה״ב', isDialog: true, isContent: true, class: 'new-item'},
    // {label: 'מאמרי בית המדרש', routerLink: AppPages.articles, icon: 'pi pi-book'},
    // {label: 'נקודות בלימוד רמב״ן על התורה', routerLink: AppPages.learnRamban, icon: 'pi pi-book'},
    {title: '', label: 'מבי מדרשא - מאמר שבועי', routerLink: AppPages.weeklyArticle, icon: 'pi pi-book'},
    {title: '', label: 'קו טלפון לשיעורי בית המדרש',isDialog: true, class: '', header: 'קו טלפון לשיעורי בית המדרש',
        content: [
            'חדש! ניתן להאזין לשיעורי בית המדרש בקו ייעודי שמספרו 0796077980'
        ]
    },

    {
        label: 'שיעורי בית המדרש', isDialog: true,
        header: 'שיעורי בית המדרש', content: [
            "שיעורי בית המדרש \n" +

            "השיעורים הקבועים\n" +
            "המתקיימים בביהכ''נ רחוב מדבר סיני 27 ירושלים\n" +
            "\n" +
            "יום ראשון 14.00 - תורת הציבור\n" +
            "יום שני 14.00 - אורח חיים\n" +
            "יום שלישי - 14.00 - נביא ספר מלכים\n" +
            "יום רביעי - 14.00 - דרכי חכמים\n" +
            "יום חמישי - 14.00 - משניות שבת\n" +
            "\n" +
            "בנוסף מתקיים שיעור בבני ברק בביהכ''נ רחוב בן זכאי 43\n" +
            "ענפי המצוות - יום שלישי 22.30\n" +
            " הקלטות השיעורים עולים מדי שבוע לאתר בית המדרש, ונשלחים במייל"

        ]
    },
    {label: 'תרומה לאתר', url: "https://nedar.im/jzdr", icon: 'pi pi-database'},
]


