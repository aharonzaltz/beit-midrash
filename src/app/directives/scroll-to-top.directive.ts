import {DOCUMENT} from '@angular/common';
import {Directive, Inject, Input, NgModule} from '@angular/core';

@Directive({
    selector: "[scrollToTop]",
})
export class ScrollToTopDirective {

    constructor(
        @Inject(DOCUMENT) private document: Document,
    ) {
    }

    ngOnInit() {
        this.document.getElementsByClassName('page')[0].scrollTo(0, 0);
    }
}

@NgModule({
    declarations: [
        ScrollToTopDirective
    ],
    exports: [ScrollToTopDirective]
})
export class ScrollToTopDirectiveModule {
}
