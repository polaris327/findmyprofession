import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {REGEX_EMAIL_PATTERN} from '../../core/validators/validation-patterns.model';
import {ShowValidationErrors} from '../../core/validators/show-validation-errors.model';
import {ISignInModelRequest, SignInErrors} from './signin.model';
import {SignInService} from './signin.service';
import {IErrorResponse} from '../../core/models/core.model';
import {UserService} from '../../core/services/user.service';
import {IUser} from '../../core/models/user.model';
import {MetaTags} from '../../core/services/meta-tags.service';
import {CoreUtilitiesService} from '../../core/services/core-utilities.service';

@Component({
  selector: 'fmp-signin-component',
  templateUrl: 'signin.component.html',
  styles: [require('./signin.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent extends ShowValidationErrors implements OnInit, OnDestroy {

  public modelForm: FormGroup;

  /**
   * Alias for SignInErrors
   */
  public fm: any;

  /**
   * State of current request
   * @type {boolean}
   */
  public isRequestSending: boolean = false;
  public isComponentInited: boolean = false;

  /**
   * Error message
   */
  public errorMessage: string;

  constructor(private fb: FormBuilder,
              private errorFormModel: SignInErrors,
              private signInService: SignInService,
              private userService: UserService,
              private router: Router,
              private metaService: MetaTags) {
    super();

    this.setMetaTags();
    this.buildModelForm();
  }

  public ngOnDestroy() {
    this.resetComponent();
  }

  public ngOnInit(): void {
    this.isComponentInited = true;
  }

  /**
   * Method to send form
   */
  public sendForm(): void {
    this.errorMessage = '';

    /*Setting global form validation*/
    this.setGlobal();
    super.onValueChanged();

    if (this.modelForm.invalid) {
      return;
    }

    this.isRequestSending = true;

    this.signInService.signInUser(this.getSignInData(this.modelForm.value))
      .finally(() => this.isRequestSending = false)
      .subscribe(
        (response: IUser) => this.signInHandler(response),
        (errorObject: IErrorResponse) => this.errorMessage = errorObject.message
      );

  }

  /**
   * Method to close error
   * @param field
   */
  public closeError(field: string): void {
    this.fm[field] ? this.fm[field] = '' : this.errorMessage = '';
  }

  /**
   * Method to handle sign in method
   * @param response
   */
  private signInHandler(response: IUser): void {
    this.userService.signIn(response , this.modelForm.value.rememberUser)
    Observable.fromPromise(this.router.navigate(['/home']))
      .filter((state: boolean) => state)
      .subscribe(
        () => this.resetComponent()
      );
  }

  /**
   * Method to build model form
   */
  private buildModelForm(): void {
    this.fm = this.errorFormModel.formErrors;

    this.modelForm = this.fb.group({
      email: [null ,[
        Validators.required,
        Validators.pattern(REGEX_EMAIL_PATTERN)
      ]],
      password: [null, [
        Validators.required
      ]],
      rememberUser: [false],
      isGlobalValidate: [false]
    });

    super.setData(this.modelForm , this.errorFormModel);

    Observable.merge(
      this.modelForm.get('email').valueChanges,
      this.modelForm.get('password').valueChanges
    ).subscribe(() => {
      this.setGlobal();
      super.clearErrors();
    });
  }

  /**
   * Create object with data to send on server
   * @param modelForm
   * @returns {{email, password}}
   */
  private getSignInData(modelForm: any): ISignInModelRequest {
    return {
      email: modelForm.email,
      password: modelForm.password,
      timezone: CoreUtilitiesService.getTimeZone()
    }
  }

  private resetComponent(): void {
    this.modelForm.reset();
    this.errorMessage = '';
    super.clearErrors();
  }

  private setGlobal(value: boolean = true): void {
    this.modelForm.get('isGlobalValidate').setValue(value);
  }

  private setMetaTags(): void {
    const title: string = 'Login - Find My Profession';
    this.metaService.setTitle(title);
    this.metaService.setTitles(title);
    this.metaService.setDescription('Please log in to Find My Profession. Take the next step in your career with our career finder service and get hired with the minimal amount of effort.');
    this.metaService.removeImageTags();
  }
}