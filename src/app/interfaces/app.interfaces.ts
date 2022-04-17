import {MenuItem} from "primeng/api";

export interface appMenuItem extends MenuItem {
    value?: string
}

export enum Severity {
    success = "success",
    info = "info",
    warn = "warn",
    error = "error",
}

export enum MessageDetails {
    errorDownload = "שגיאה בהורדת הקובץ",
    successSendMessage = "ההודעה נשלחה בהצלחה",
    invalidLogin = "שם משתמש או סיסמא שגויים",
}
