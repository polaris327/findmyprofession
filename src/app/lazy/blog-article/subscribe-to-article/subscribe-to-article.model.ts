import {ValidationErrors} from '../../../core/validators/validators.model';

export class SubscribeToArticleErrors {

  public formErrors = {
    email: ''
  };

  public validationMessages = {
    email: {
      required: ValidationErrors.email.required,
      pattern: ValidationErrors.email.pattern
    }
  };

}
