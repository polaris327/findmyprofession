import { ValidationErrors } from '../../core/validators/validators.model';
var ContactUsErrors = /** @class */ (function () {
    function ContactUsErrors() {
        this.formErrors = {
            email: '',
            name: '',
            message: '',
            captcha: ''
        };
        this.validationMessages = {
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
    return ContactUsErrors;
}());
export { ContactUsErrors };
