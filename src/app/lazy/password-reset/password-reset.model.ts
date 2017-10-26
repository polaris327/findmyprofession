import {ValidationErrors} from '../../core/validators/validators.model';

export class ResetPasswordErrors {

  public formErrors = {
    email: '',
    password: '',
    confirm_password: ''
  };

  public validationMessages = {

    email: {
      required: ValidationErrors.email.required,
      pattern: ValidationErrors.email.pattern
    },

    password: {
      required: ValidationErrors.password.required,
      minLength: ValidationErrors.password.minLength,
      passwordShouldContainSymbol: ValidationErrors.password.format
    },

    confirm_password: {
      required: ValidationErrors.confPassword.required,
      passwordsNotMatch:  ValidationErrors.confPassword.passwordsNotMatch
    }

  };

}

export interface IResetPasswordParams {
  /**
   * Token
   */
  t: string;
}

export interface IResetPasswordRequest {
  token: string;
  password: string;
  confirm_password: string;
}