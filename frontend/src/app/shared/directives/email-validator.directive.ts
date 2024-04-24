import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
})
export class EmailValidatorDirective implements Validator {

  constructor( private customValidatorService: CustomValidatorService) { }

  @HostListener("keydown", ["$event"])
  validate(control: AbstractControl): ValidationErrors | null {
    return this.customValidatorService.emailValidator()(control);
  }

}
