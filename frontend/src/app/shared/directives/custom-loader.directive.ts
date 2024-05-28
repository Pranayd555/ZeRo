import { Directive, ElementRef, HostBinding, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';

@Directive({
  selector: '[appCustomLoader]'
})
export class CustomLoaderDirective{

  @Input() set isLoading(v: number) {
    if(!Number.isNaN(v) && this.element.nativeElement.id.includes(v)) {
      this.element.nativeElement.style.display = 'block';
    } else {
      this.element.nativeElement.style.display = 'none';
    }
  }

  constructor(private element: ElementRef, private renderer: Renderer2, private matLoader: MatProgressBar) { }

  @HostBinding('style.display') display: string = 'none';


}
