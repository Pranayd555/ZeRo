import { NgModule } from '@angular/core';
import { CommonModule, FormStyle } from '@angular/common';

import { FruitsRoutingModule } from './fruits-routing.module';
import { FruitsComponent } from './fruits.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FruitsComponent
  ],
  imports: [
    CommonModule,
    FruitsRoutingModule,
    FormsModule,
  ]
})
export class FruitsModule { }
