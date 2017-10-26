import { ValidationErrors } from '../../../core/validators/validators.model';
var PaymentInfoErrors = /** @class */ (function () {
    function PaymentInfoErrors() {
        this.formErrors = {
            number: '',
            exp_year: '',
            exp_month: '',
            cvc: ''
        };
        this.validationMessages = {
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
    return PaymentInfoErrors;
}());
export { PaymentInfoErrors };
