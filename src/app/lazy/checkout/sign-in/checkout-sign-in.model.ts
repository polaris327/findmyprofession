import {ValidationErrors} from '../../../core/validators/validators.model';

export class CheckoutSignInErrors {

  public formErrors = {
    email: '',
    password: '',
  };

  public validationMessages = {
    email: {
      required: ValidationErrors.email.required,
      pattern: ValidationErrors.email.pattern
    },
    password: {
      required: ValidationErrors.password.required
    },
  };

}