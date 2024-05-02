import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { UtilityModule } from '../shared/modules/utilities/utilities.module';


@NgModule({
  declarations: [
    RegisterComponent,
    UserLoginComponent,
    UserSignupComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    SharedModule,
    UtilityModule
  ]
})
export class RegisterModule { }
