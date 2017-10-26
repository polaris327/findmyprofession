import {AbstractControl, FormGroup} from '@angular/forms';

export class ShowValidationErrors {
  public defaultError: string = 'Field Error.';
  public modelForm: FormGroup;
  public errorForm: any;

  public setData(model: FormGroup , form: any) {
    this.modelForm = model;
    this.errorForm = form;
  }

  public onValueChanged(): void {
    if (!this.modelForm) {
      return;
    }
    const form: FormGroup = this.modelForm;

    Object.keys(this.errorForm.formErrors)
      .filter((field: string) => this.errorForm.formErrors.hasOwnProperty(field))
      .forEach((field: string) => {

        this.errorForm.formErrors[field] = '';
        const control: AbstractControl = form.get(field);

        if (control && ((control.dirty && control.touched) || form.get('isGlobalValidate').value) && control.invalid) {
          const messages = this.errorForm.validationMessages[field];
          Object.keys(control.errors)
            .filter((key: string) => messages.hasOwnProperty(key))
            .forEach((key: string) => this.errorForm.formErrors[field] += messages[key] || this.defaultError)
        }
      });
  }

  /**
   * Method to clear errors
   */
  public clearErrors(): void {
    if (this.errorForm) {
      Object.keys(this.errorForm.formErrors)
        .filter((key: string) => this.errorForm.formErrors.hasOwnProperty(key))
        .forEach((key: string) => {
        this.errorForm.formErrors[key] = '';
      })
    }
  }
}

