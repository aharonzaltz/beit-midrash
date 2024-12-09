import {FileType, Lesson, LessonBackground, LessonPackage} from "../interfaces/lessons-interfaces";


function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

export function decodeText(text: string) {
    const value = decodeURI(text).split("+").join(' ')
        .replace('.mp4', '')
        .replace('.mp3', '')
        .replace('.MP3', '')
        .replace('.pdf', '');
    return replaceAll(value, '%2C', '');
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
    return ( ( window.innerWidth <= 900 ) && ( window.innerHeight <= 900 ) );
}

export function isIOSDevice() {
    return [
            'iPad Simulator',
            'iPhone Simulator',
            'iPod Simulator',
            'iPad',
            'iPhone',
            'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
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

export function getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export function generateRandomDateFormatted() {
    // Define a start date and end date
    const startDate = new Date(2023, 0, 1); // January 1, 2023
    const endDate = new Date(2023, 11, 31); // December 31, 2023

    // Get a random date between start and end
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));

    // Extract year, month, and day
    const year = randomDate.getFullYear();
    const month = randomDate.getMonth() + 1; // getMonth() is zero-indexed
    const day = randomDate.getDate();

    // Format month and day to always be two digits
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // Combine to get the desired format YYYYMMDD
    return `${year}${formattedMonth}${formattedDay}`;
}




