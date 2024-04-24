import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [{ path: '', component: UserSignupComponent },
{ path: 'signup', component: UserSignupComponent },
{ path: 'login', component: UserLoginComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
