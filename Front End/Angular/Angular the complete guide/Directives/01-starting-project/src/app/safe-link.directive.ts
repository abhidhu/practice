import { Directive, ElementRef, HostListener, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";


@Directive( {
  selector: 'a[appSafeLink]',
  standalone: true,
  hostDirectives: [LogDirective]
} )
export class SafeLinkDirective {

  queryParam = input( 'myapp' );

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log( 'safeLinkDirective is active !' )
  }

  @HostListener( 'click', [ '$event' ] ) onConfirmLeavePage( event: MouseEvent ) {
    console.log( 'hello -> ' + event )
    const wantsToLeave = window.confirm( 'Do you want to leave the app?' )
    if ( wantsToLeave ) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}