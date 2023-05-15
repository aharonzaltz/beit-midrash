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
    downloadInProcess = "הורדה מתבצעת ברקע",
    errorDownload = "שגיאה בהורדת הקובץ",
    errorSendMessage = "שגיאה בשליחת ההודעה",
    successSendMessage = "ההודעה נשלחה בהצלחה",
    wrongPassword = "שם משתמש או סיסמא שגויים",
    networkFailed = "אין חיבור לרשת",
    invalidEmail = "הזן כתובת מייל תקנית!",
    weakPassword = "סיסמא חלשה מדי!",
    emailAlreadyInUse = "כתובת מייל זו נמצאת בשימוש!",
    userNotFound = "משתמש זה אינו קיים",
    sendPasswordResetEmail = 'נשלח מייל איפוס סיסמא. אנא בדוק את תיבת המייל שלך!'
}

export enum FirebaseErrors {
    invalidEmail = 'auth/invalid-email',
    weakPassword = "auth/weak-password",
    emailAlreadyInUse = "auth/email-already-in-use",
}

export interface GeneralData {
    countDownload:number;
    watchCount:number;
}

export interface AppDialog {
    header: string;
    content: string[];

}

export interface HomeMenuItem extends MenuItem {
    isDialog?: boolean;
    header?: string;
    class?: string;
    content?: string[];
}
