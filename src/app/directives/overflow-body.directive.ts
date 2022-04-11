import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Directive, EmbeddedViewRef, Inject, Injector, Input, NgModule, Renderer2, ViewContainerRef } from '@angular/core';
import { BackdropComponent } from './backdrop.component';
import { ChangeBackgroundDirective } from './change-background.directive';

@Directive({
  selector: "[backdrop]",
})
export class BackdropDirective {

    ref!: ComponentRef<BackdropComponent>;
    domElem: HTMLElement;

    private elementAttached = false;

  @Input() set showBackdrop(showBackdrop: boolean) {
    this.showHideBackdrop(showBackdrop);
  }

  constructor(
      @Inject(DOCUMENT) private document: Document,
      private resolver: ComponentFactoryResolver,
      private injector: Injector,
      private appRef: ApplicationRef,
      ) {
        this.ref = this.resolver.resolveComponentFactory(BackdropComponent).create(this.injector);
        this.appRef.attachView(this.ref.hostView);
        this.domElem = (this.ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      }

  showHideBackdrop(showBackdrop: boolean) {
    if (showBackdrop) {
        this.document.body.appendChild(this.domElem);
        this.elementAttached = true;
    } else if(this.elementAttached){
        this.appRef.detachView(this.ref.hostView);
        this.ref.destroy();
        this.document.body.removeChild(this.domElem);
    }
  }
}