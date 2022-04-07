export interface LessonPackage {
    title: string;
    name: string;
    index: number;
    background: string;
    values: {[key:string]: Lesson};
}

export interface Lesson {
    name: string;
    url: string;
    id: string;
    downloadCount: number;
    watchCount: number;
    fileType: FileType;
}

export enum FileType {
    undefined,
    music,
    video,
    pdf
}

export interface LessonBackground {
    name: string;
    background: string;
    packageName: string;
    lessons?: {[key: string]: LessonPackage}
}

export interface HomeLessonBackground extends LessonBackground{
    url: string;
    directUrl?: boolean;
}
