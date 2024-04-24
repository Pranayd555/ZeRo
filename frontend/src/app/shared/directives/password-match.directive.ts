import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordMatchDirective, multi: true}]
})
export class PasswordMatchDirective implements Validator {

  constructor( private customValidatorService: CustomValidatorService) { }

  @Input('appPasswordMatch') MatchPassword: string[] = []

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.customValidatorService.matchPassword(
      this.MatchPassword[0],
      this.MatchPassword[1]
    )(control)
  }
}
