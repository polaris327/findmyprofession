var AccordionTabProfileErrors = /** @class */ (function () {
    function AccordionTabProfileErrors() {
        this.formErrors = {
            linkedin_url: '',
            full_name: '',
            postal_code: ''
        };
        this.validationMessages = {
            full_name: {
                required: 'Fullname is required field'
            },
            linkedin_url: {
                pattern: "It's not a valid LinkedIn url"
            },
            postal_code: {
                pattern: 'Postal code has invalid format'
            }
        };
    }
    return AccordionTabProfileErrors;
}());
export { AccordionTabProfileErrors };
export var COMPONENT_RESTRICTIONS = {
    country: 'US'
};
export var FIELD_SETTINGS = {
    postal_code: {
        types: [
            '(regions)'
        ],
        componentRestrictions: COMPONENT_RESTRICTIONS
    },
    state: {
        types: [
            'geocode'
        ],
        componentRestrictions: COMPONENT_RESTRICTIONS
    },
    city: {
        types: [
            '(cities)'
        ],
        componentRestrictions: COMPONENT_RESTRICTIONS
    },
    address: {
        types: [
            'address'
        ],
        componentRestrictions: COMPONENT_RESTRICTIONS
    }
};
