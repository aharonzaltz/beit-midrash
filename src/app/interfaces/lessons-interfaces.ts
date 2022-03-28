export interface LessonPackage {
    name: string;
    background: string;
    values: Lesson[];
}

export interface Lesson {
    name: string;
    url: string;
}

export interface LessonBackground {
    name: string;
    background: string;
    packageName: string;
}