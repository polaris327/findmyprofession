var JobAddErrors = /** @class */ (function () {
    function JobAddErrors() {
        this.formErrors = {
            link: '',
            company: '',
            position: ''
        };
        this.validationMessages = {
            link: {
                required: 'Job Link required',
                pattern: 'Job Link is not valid'
            },
            company: {
                required: 'Company Name required'
            },
            position: {
                required: 'Job Title required'
            }
        };
    }
    return JobAddErrors;
}());
export { JobAddErrors };
