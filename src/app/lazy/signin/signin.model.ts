import {ValidationErrors} from '../../core/validators/validators.model';

export class SignInErrors {

  public formErrors = {
    email: '',
    password: '',
    rememberUser: ''
  };

  public validationMessages = {
    email: {
      required: ValidationErrors.email.required,
      pattern: ValidationErrors.email.pattern
    },
    password: {
      required: ValidationErrors.password.required
    },
    rememberUser: {}
  };

}

export interface ISignInModelRequest {
  email: string;
  password: string;
  timezone: string;
}