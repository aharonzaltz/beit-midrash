import {MenuItem} from "primeng/api";
import {appMenuItem} from "../interfaces/app.interfaces";

export enum AppPages {
  login = "login",
  home = "home",
  uploadFiles = "uploadFiles",
  haravInbal = "harav-inbal",
  seminars = "seminars",
  beitMidrash = "beit-midrash",
  hemshechHazman = "hemshech-hazman",
  contact = "contact",
}


export const APP_MENU_ITEMS:appMenuItem[] = [
  {label: 'דף הבית', routerLink: AppPages.home},
  {label: 'הרב אוריה עינבל',  routerLink: AppPages.haravInbal},
  {label: 'ימי עיון', routerLink: AppPages.seminars},
  {label: 'בית המדרש', routerLink: AppPages.beitMidrash},
  {label: 'ישיבת המשך הזמן', routerLink: AppPages.hemshechHazman},
  {label: 'צור קשר', routerLink: AppPages.contact}
]

export const APP_MENU_ITEMS_FOR_MANAGER = APP_MENU_ITEMS.concat(
  {label: 'העלאת קבצים', routerLink: AppPages.uploadFiles}
)
