import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlighter]'
})
export class BetterHighlighterDirective {

  

  constructor( private element: ElementRef) { }

  @HostBinding('style.backgroundColor') backgroundColor: string = '#F5E9E7';

  @HostListener('mouseenter', ['$event']) onMouseEnter () {
    this.element.nativeElement.style.backgroundColor = '#39FF90';
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave () {
    this.element.nativeElement.style.backgroundColor = '#F5E9E7';
  }

}
