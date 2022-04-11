
export interface BookBase {
    url: string;
    name: string;
    description?: string;
    id: string;
}
export interface Book extends BookBase {
    background:string;
}

