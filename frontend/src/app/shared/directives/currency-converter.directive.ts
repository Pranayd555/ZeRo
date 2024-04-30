import { Directive, HostListener, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
  selector: '[appCurrencyConverter]',
  providers: [MatTooltip]
})
export class CurrencyConverterDirective {

  @Input() appCurrencyConverter : any = []
  @Input() amount = {price: '', id: 0};

constructor(public matTooltip: MatTooltip) {
}  


@HostListener('mouseenter', ['$event']) onMouseEnter(): void {

  let convertedAmount = ""
  if(this.amount && this.appCurrencyConverter) {
    convertedAmount = JSON.stringify(Math.round(this.appCurrencyConverter[0]["inr/usd"] * Number(this.amount.price)))
  }
  this.matTooltip.message = 'Rs. ' + convertedAmount;
  this.matTooltip.show();
}

@HostListener('mouseleave', ['$event']) onMouseLeave(): void {
  this.matTooltip.message = '';
  this.matTooltip.hide();
}

}
