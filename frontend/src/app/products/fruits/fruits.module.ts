import { NgModule } from '@angular/core';
import { CommonModule, FormStyle } from '@angular/common';

import { FruitsRoutingModule } from './fruits-routing.module';
import { FruitsComponent } from './fruits.component';
import { FormsModule } from '@angular/forms';
import { UtilityModule } from 'src/app/shared/modules/utilities/utilities.module';
// import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    FruitsComponent
  ],
  imports: [
    CommonModule,
    FruitsRoutingModule,
    FormsModule,
    UtilityModule,
    MatTooltipModule
  ]
})
export class FruitsModule { }
