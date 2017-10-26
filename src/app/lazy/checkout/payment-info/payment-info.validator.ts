import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class PaymentInfoValidator {
  public static cardNumberValidator(control: AbstractControl): any {
    if (control.value) {
      if (!Stripe.validateCardNumber(control.value)) {
        return {
          in_valid: true
        }
      }
    }
    return null;
  }

  public static cardValidateCVC(control: AbstractControl): any {
    if (control.value) {
      if (!Stripe.validateCVC(control.value)) {
        return {
          in_valid: true
        }
      }
    }
    return null;
  }

  public static cardValidateExpiry(exp_month: AbstractControl, exp_year: AbstractControl): any {
    if (exp_month.value && exp_year.value) {
      if (!Stripe.validateExpiry(exp_month.value , exp_year.value)) {
        return {
          in_valid: true
        }
      }
    }
    return null;
  }
}