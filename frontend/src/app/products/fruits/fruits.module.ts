import { NgModule } from '@angular/core';
import { CommonModule, FormStyle } from '@angular/common';

import { FruitsRoutingModule } from './fruits-routing.module';
import { FruitsComponent } from './fruits.component';
import { FormsModule } from '@angular/forms';
import { UtilityModule } from 'src/app/shared/modules/utilities/utilities.module';
import { MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AddFruitComponent } from './add-fruit/add-fruit.component';

@NgModule({
  declarations: [
    FruitsComponent,
    AddFruitComponent
  ],
  imports: [
    CommonModule,
    FruitsRoutingModule,
    FormsModule,
    UtilityModule,
    MatTooltipModule,
    MatProgressBarModule
  ]
})
export class FruitsModule { }
