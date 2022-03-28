export function decodeText(text: string) {
    return decodeURI(text).split("+").join(' ').replace('.mp4', '').replace('.mp3', '').replace('%2C', '');
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
