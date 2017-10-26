import { ValidationErrors } from '../../../core/validators/validators.model';
var SignUpErrors = /** @class */ (function () {
    function SignUpErrors() {
        this.formErrors = {
            full_name: '',
            email: '',
            password: '',
            confirm_password: '',
            acceptConditions: ''
        };
        this.validationMessages = {
            full_name: {
                required: ValidationErrors.full_name.required,
                minlength: ValidationErrors.full_name.minLength,
                maxlength: ValidationErrors.full_name.maxLength,
            },
            email: {
                required: ValidationErrors.email.required,
                pattern: ValidationErrors.email.pattern
            },
            password: {
                required: ValidationErrors.password.required,
                minlength: ValidationErrors.password.minLength.replace('{symbols}', '3'),
                passwordShouldContainSymbol: ValidationErrors.password.format
            },
            confirm_password: {
                required: ValidationErrors.confPassword.required,
                passwordsNotMatch: ValidationErrors.confPassword.passwordsNotMatch
            },
            acceptConditions: {
                required: ValidationErrors.acceptConditions.required,
                requiredTrue: ValidationErrors.acceptConditions.requiredTrue
            }
        };
    }
    return SignUpErrors;
}());
export { SignUpErrors };
