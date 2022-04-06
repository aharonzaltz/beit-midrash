import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";


@Injectable()
export class BookService {

    private currentBookSub = new BehaviorSubject<string | null>(null);
    currentBook$ = this.currentBookSub.asObservable();

    setCurrentBook(currentBook: string | null) {
        setTimeout(() => {
            this.currentBookSub.next(currentBook);
        },1)
    }

}