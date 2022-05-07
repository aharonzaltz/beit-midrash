import {FileType, Lesson, LessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";

export function decodeText(text: string) {
    return decodeURI(text).split("+").join(' ')
        .replace('.mp4', '')
        .replace('.mp3', '')
        .replace('.MP3', '')
        .replace('.pdf', '')
        .replace('%2C', '');
}

export function isObject(value: any){
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function removeNumbersFromKeys(obj: any){
    const regex = new RegExp("[0-9]-", "g");
    if(!obj) return obj
    Object.keys(obj).forEach(key => {
        let newKey = ''
        if(regex.test(key)){

            newKey = key.replace(regex, "");
            obj[newKey] = obj[key]
            delete obj[key];
        }
        if(isObject(obj[newKey]) || isObject(obj[key])){
            return removeNumbersFromKeys(obj[key])
        }

    })
    return obj;
}

export function isMobile(): boolean {
    return ( ( window.innerWidth <= 800 ) && ( window.innerHeight <= 800 ) );
}

export function getNestedPropertyByKey(object: object, key?: string) {
    if(!key) return;
    if (/\s/.test(key)) {
        const keys = key.split(' ');
        for(const key of keys) {
            const value = key.split("/").reduce((acc: any, val) => acc[val] || {}, object);
            if(value ?? JSON.stringify(value) !== JSON.stringify({})){
                return value;
            }
        }
        return null;
    }
    const value = key.split("/").reduce((acc: any, val) => acc[val] ?? {}, object);
    return JSON.stringify(value) === JSON.stringify({}) ? null: value;
}

export function isUid(text: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(text);
}

export function getFileType(item: Lesson): FileType {
    const url = item.url.toLowerCase();
    return url.includes("mp4") ? FileType.video :
        url.includes("mp3") ? FileType.music :
            url.includes("pdf") ? FileType.pdf : FileType.undefined
}

export function getLessonName(lesson: Lesson) {
    return lesson.name || decodeText(lesson.url.split('/').pop()!)
}


