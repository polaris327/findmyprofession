import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class CustomValidators {

  // private static regex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*,.])[a-zA-Z0-9!@#$%^&*,.]/;
  private static regex: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  public static passwordValidator(control) {
      if (control.value) {
          if (!CustomValidators.regex.test(control.value.toString())) {
              return {
                  passwordShouldContainSymbol: true
              };
            }
        }
      return null;
    }

  public static confirmationPasswordValidator(controlA: AbstractControl, controlB: AbstractControl) {
    if (controlA.value && controlB.value) {
      if (controlA.value.toString() !== controlB.value.toString()) {
        return {
          passwordsNotMatch: true
        }
      }
    }
    return null;
  }
}