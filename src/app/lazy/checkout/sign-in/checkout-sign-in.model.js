import { ValidationErrors } from '../../../core/validators/validators.model';
var CheckoutSignInErrors = /** @class */ (function () {
    function CheckoutSignInErrors() {
        this.formErrors = {
            email: '',
            password: '',
        };
        this.validationMessages = {
            email: {
                required: ValidationErrors.email.required,
                pattern: ValidationErrors.email.pattern
            },
            password: {
                required: ValidationErrors.password.required
            },
        };
    }
    return CheckoutSignInErrors;
}());
export { CheckoutSignInErrors };
