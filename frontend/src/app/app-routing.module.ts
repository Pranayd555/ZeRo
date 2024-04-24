import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './common/welcome/welcome.component';


const routes: Routes = [{ path: 'user-register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
{ path: 'welcome', component: WelcomeComponent},
{ path: '',   redirectTo: 'user-register', pathMatch: 'full' },
{ path: 'fruits', loadChildren: () => import('./products/fruits/fruits.module').then(m => m.FruitsModule) },
// { path: '**', component:  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
