import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FruitsComponent } from './fruits.component';

const routes: Routes = [{ path: '', component: FruitsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FruitsRoutingModule { }
