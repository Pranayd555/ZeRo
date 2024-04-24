import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})
export class PasswordValidatorDirective implements Validator {

  @Input() minChar: number = 8;
  constructor( private customValidatorService: CustomValidatorService) { }

  @HostListener('keydown', ['$event'])
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.customValidatorService.passwordValidator(this.minChar)(control);
  }

}
