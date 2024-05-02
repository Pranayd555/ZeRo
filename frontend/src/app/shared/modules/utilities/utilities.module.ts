import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterDirective } from '../../directives/currency-converter.directive';
import { HighlightDirective } from '../../directives/highlight.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    CurrencyConverterDirective,
    HighlightDirective
    ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CurrencyConverterDirective,
    HighlightDirective,
    MatProgressSpinnerModule
    ]
})
export class UtilityModule { }
