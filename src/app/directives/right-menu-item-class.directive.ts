import {Directive, ElementRef, Input, NgModule, Renderer2} from '@angular/core';


@Directive({
    selector: "[rightMenuItemClass]",
})
export class RightMenuItemClassDirective {

    @Input() className?: string;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {
        this.initClassName()
    }

    private initClassName() {
        setTimeout(() => {
            this.renderer.removeClass(this.element.nativeElement, this.className || '');
        }, 20000)
    }
}

@NgModule({
    declarations: [RightMenuItemClassDirective],
    exports: [RightMenuItemClassDirective],
})
export class RightMenuItemClassDirectiveModule {}
