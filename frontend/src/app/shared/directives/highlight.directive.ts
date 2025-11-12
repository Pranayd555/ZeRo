import { Directive, ElementRef, HostListener, Input, Renderer2, SimpleChange } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight : boolean = false;
  @Input() color : any = {
    name:true,
    price: true,
    about: true,
    discount: true
  }
  @Input() ele: string = '';
  @Input() zoomScale: number = 1.2; // how much to zoom
  @Input() zoomTransition: string = 'transform 0.3s ease-in-out';
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.el.nativeElement, 'transition', this.zoomTransition);
   }

   @HostListener("mouseenter") onMouseEnter() {
      this.zoomIn();
   }

   @HostListener("mouseleave") onMouseLeave() {
      this.zoomOut();
   }

   ngOnChanges(changes: SimpleChange) {
    if(this.appHighlight) {
    this.highlight(this.color);
    } else {
    this.highlight("")
    }
   }

   private highlight(color: any) {
    if(color) {
      this.el.nativeElement.style.color = color[this.ele]
    } else {
      this.el.nativeElement.style.color = ''
    }
   }

   private zoomIn() {
     this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${this.zoomScale})`);
   }

   private zoomOut() {
     this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
   }

}
