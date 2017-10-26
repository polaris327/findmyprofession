import {ValidationErrors} from '../../../core/validators/validators.model';

export class PaymentInfoErrors {

  public formErrors = {
    number: '',
    exp_year: '',
    exp_month: '',
    cvc: ''
  };

  public validationMessages = {
    number: {
      required: ValidationErrors.number.required,
      in_valid: ValidationErrors.number.in_valid
    },
    exp_year: {
      required: '',
      in_valid: ''
    },
    exp_month: {
      required: '',
      in_valid: ''
    },
    cvc: {
      required: '',
      in_valid: ''
    }
  };

}