import {ValidationErrors} from '../../core/validators/validators.model';
import {IPageData} from '../../core/models/page-data.model';

export class ContactUsErrors {

  public formErrors = {
    email: '',
    name: '',
    message: '',
    captcha: ''
  };

  public validationMessages = {
    email: {
      required: ValidationErrors.email.required,
      pattern: ValidationErrors.email.pattern
    },
    name: {
      required: 'This field is required.',
      minlength: 'Min length is 3'
    },
    message: {
      required: 'This field is required.'
    },
    captcha: {
      required: 'You must confirm that you are not a robot.'
    }
  };

}

export namespace ContactUs {

  export interface IContactusPage extends IPageData {
    form_title: string;
    form_content: string;
    phone_title: string;
    phone_number: string;
    phone_time: string;
  }

}

export interface IContactUsRequest {
  email: string;
  name: string;
  message: string;
}