import { DOCUMENT} from '@angular/common';
import {Directive, Inject, Input, NgModule} from '@angular/core';

@Directive({
  selector: "[overflowBody]",
})
export class OverflowBodyDirective {

  @Input() set overflowBody(overflowBody: boolean) {
    this.changeOverflowBody(overflowBody);
  }

  constructor(
      @Inject(DOCUMENT) private document: Document,
      ) {}

    changeOverflowBody(preventOverflow: boolean) {
        this.document.body.style.overflow = preventOverflow ? 'hidden' : 'auto';
  }
}

@NgModule({
    declarations: [
        OverflowBodyDirective
    ],
    exports: [OverflowBodyDirective]
})
export class OverflowBodyModule { }