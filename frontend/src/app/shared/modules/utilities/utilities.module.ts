import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterDirective } from '../../directives/currency-converter.directive';
import { HighlightDirective } from '../../directives/highlight.directive';



@NgModule({
  declarations: [
    CurrencyConverterDirective,
    HighlightDirective
    ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyConverterDirective,
    HighlightDirective
    ]
})
export class UtilityModule { }
