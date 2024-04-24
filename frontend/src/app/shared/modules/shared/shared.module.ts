import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidatorDirective } from '../../directives/email-validator.directive';
import { PasswordValidatorDirective } from '../../directives/password-validator.directive';
import { PasswordMatchDirective } from '../../directives/password-match.directive';



@NgModule({
  declarations: [
    EmailValidatorDirective,
  PasswordValidatorDirective,
  PasswordMatchDirective],
  imports: [
    CommonModule
  ],
  exports: [
    EmailValidatorDirective,
    PasswordValidatorDirective,
    PasswordMatchDirective]
})
export class SharedModule { }
