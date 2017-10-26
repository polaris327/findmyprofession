var ShowValidationErrors = /** @class */ (function () {
    function ShowValidationErrors() {
        this.defaultError = 'Field Error.';
    }
    ShowValidationErrors.prototype.setData = function (model, form) {
        this.modelForm = model;
        this.errorForm = form;
    };
    ShowValidationErrors.prototype.onValueChanged = function () {
        var _this = this;
        if (!this.modelForm) {
            return;
        }
        var form = this.modelForm;
        Object.keys(this.errorForm.formErrors)
            .filter(function (field) { return _this.errorForm.formErrors.hasOwnProperty(field); })
            .forEach(function (field) {
            _this.errorForm.formErrors[field] = '';
            var control = form.get(field);
            if (control && ((control.dirty && control.touched) || form.get('isGlobalValidate').value) && control.invalid) {
                var messages_1 = _this.errorForm.validationMessages[field];
                Object.keys(control.errors)
                    .filter(function (key) { return messages_1.hasOwnProperty(key); })
                    .forEach(function (key) { return _this.errorForm.formErrors[field] += messages_1[key] || _this.defaultError; });
            }
        });
    };
    /**
     * Method to clear errors
     */
    ShowValidationErrors.prototype.clearErrors = function () {
        var _this = this;
        if (this.errorForm) {
            Object.keys(this.errorForm.formErrors)
                .filter(function (key) { return _this.errorForm.formErrors.hasOwnProperty(key); })
                .forEach(function (key) {
                _this.errorForm.formErrors[key] = '';
            });
        }
    };
    return ShowValidationErrors;
}());
export { ShowValidationErrors };
