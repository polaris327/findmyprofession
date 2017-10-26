import {Component, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShowValidationErrors} from '../../core/validators/show-validation-errors.model';
import {IResetPasswordParams, IResetPasswordRequest, ResetPasswordErrors} from './password-reset.model';
import {ActivatedRoute, Router} from '@angular/router';
import {REGEX_EMAIL_PATTERN} from '../../core/validators/validation-patterns.model';
import {PasswordResetService} from './password-reset.service';
import {IErrorResponse} from '../../core/models/core.model';
import {CustomValidators} from '../../core/validators/validators.service';
import {Title} from '@angular/platform-browser';
import {MetaTags} from '../../core/services/meta-tags.service';

@Component({
  selector: 'fmp-password-reset-component',
  templateUrl: 'password-reset.component.html',
  styles: [require('./password-reset.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class PasswordResetComponent extends ShowValidationErrors  {

  /**
   * Detect if current mode is RESET
   * @type {boolean}
   */
  public isResetMode: boolean = false;

  public fm: any;

  public modelForm: FormGroup;

  public errorMessage: string;

  public isRequestSending: boolean;

  public resetModelForm: FormGroup;

  public resetToken: string;

  public isSent: boolean = false;
  public sentEmail: string;

  /**
   * Default server error message
   * @type {string}
   */
  public defaultError: string = 'Server error.';

  constructor(private fb: FormBuilder,
              private errorFormModel: ResetPasswordErrors,
              private route: ActivatedRoute,
              private passwordResetService: PasswordResetService,
              private router: Router,
              private titleService: Title,
              private metaTags: MetaTags) {
    super();

    this.titleService.setTitle('Password Reset - Find My Profession');
    this.metaTags.removeAllMetaTags();

    this.fm = this.errorFormModel.formErrors;

    /**
     * Detect if there is any token
     */
    this.route.queryParams
      .subscribe(
        (params: IResetPasswordParams) => {

          this.isResetMode = !!(params && params.t);

          if (this.isResetMode) {
            this.resetToken = params.t;

            this.resetModelForm = this.fb.group({
              'password': [null , [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(128),
                CustomValidators.passwordValidator
              ]],
              'confirm_password': [null , [
                Validators.required
              ]],
              'isGlobalValidate': [false]
            });

            super.setData(this.resetModelForm , this.errorFormModel);

            this.resetModelForm.valueChanges
              .subscribe(() => super.onValueChanged());

          } else {
            this.modelForm = this.fb.group({
              'email': [null , [
                Validators.required,
                Validators.pattern(REGEX_EMAIL_PATTERN)
              ]],
              'isGlobalValidate': [false]
            });

            super.setData(this.modelForm , this.errorFormModel);

            this.modelForm.valueChanges
              .subscribe(() => super.onValueChanged());
          }
        }
      );
  }

  public sendEmail(): void {
    if (!this.modelForm){
      return;
    }

    this.modelForm.controls['isGlobalValidate'].setValue(true);
    this.errorMessage = '';

    if (this.modelForm.invalid) {
      return;
    }

    this.isRequestSending = true;

    this.passwordResetService.sendEmail(this.modelForm.value.email)
      .finally(() => this.isRequestSending = false)
      .subscribe(
        () => {
          this.sentEmail = this.modelForm.value.email;
          this.modelForm.reset();
          this.isSent = true;
        },
        this.handleError.bind(this)
      );
  }

  /**
   * Method to reset password
   */
  public resetPassword(): void {
    if (!this.resetModelForm){
      return;
    }

    this.resetModelForm.controls['isGlobalValidate'].setValue(true);
    this.errorMessage = '';

    const errors: any = CustomValidators.confirmationPasswordValidator(this.resetModelForm.controls['password'], this.resetModelForm.controls['confirm_password']);

    if (errors) {
      this.resetModelForm.controls['confirm_password'].setErrors(errors);
    }

    super.onValueChanged();

    if (this.resetModelForm.invalid) {
      return;
    }

    const value: any = this.resetModelForm.value;

    const request: IResetPasswordRequest = {
      password: value.password,
      confirm_password: value.confirm_password,
      token: this.resetToken
    };

    this.isRequestSending = true;
    this.passwordResetService.resetPassword(request)
      .finally(() => this.isRequestSending = false)
      .subscribe(
        () => {
          this.resetModelForm.reset();
          this.router.navigate(['/login']);
        },
        this.handleError.bind(this)
      );
  }

  public closeError(field: string): void {
    if (field === 'main') {
      this.errorMessage = '';
    } else {
      this.fm[field] = '';
    }
  }

  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message || this.defaultError;
  }
}