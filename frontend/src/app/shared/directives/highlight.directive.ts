import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() color : any = {
    name:true,
    price: true,
    about: true,
    discount: true
  }
  @Input() ele: string = '';
  constructor(private el: ElementRef) {
   }

   @HostListener("mouseenter") onMouseEnter() {
    this.highlight(this.color);
   }

   @HostListener("mouseleave") onMouseLeave() {
    this.highlight("")
   }

   private highlight(color: any) {
    if(this.ele == 'name') {
      this.el.nativeElement.style.color = color.name ? color.name : '' ;
    } else if (this.ele == 'about'){
      this.el.nativeElement.style.color = color.about ? color.about : '';
    } else if (this.ele == 'discount') {
      this.el.nativeElement.style.color = color.discount ? color.discount : '';
    } else if (this.ele == 'price') {
      this.el.nativeElement.style.color = color.price ? color.price : '';
    } else {
      this.el.nativeElement.style.color = ''
    }
   }

}
