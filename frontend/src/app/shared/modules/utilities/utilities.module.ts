import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterDirective } from '../../directives/currency-converter.directive';
import { HighlightDirective } from '../../directives/highlight.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BetterHighlighterDirective } from '../../directives/better-highlighter.directive';
import { CustomLoaderDirective } from '../../directives/custom-loader.directive';



@NgModule({
  declarations: [
    CurrencyConverterDirective,
    HighlightDirective,
    BetterHighlighterDirective,
    CustomLoaderDirective
    ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CurrencyConverterDirective,
    HighlightDirective,
    BetterHighlighterDirective,
    MatProgressSpinnerModule,
    CustomLoaderDirective
    ]
})
export class UtilityModule { }
