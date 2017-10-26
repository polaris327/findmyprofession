import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {REGEX_EMAIL_PATTERN} from '../../../core/validators/validation-patterns.model';
import {ShowValidationErrors} from '../../../core/validators/show-validation-errors.model';
import {CheckoutSignInErrors} from './checkout-sign-in.model';
import {ICredentials} from '../checkout.model';
import {UserService} from '../../../core/services/user.service';
import {IUser} from '../../../core/models/user.model';

@Component({
  selector: 'fmp-checkout-sign-in-component',
  templateUrl: 'checkout-sign-in.html'
})

export class CheckoutSignInComponent extends ShowValidationErrors implements OnChanges {

  @Input()
  isGlobalValidate: boolean = false;

  @Output()
  onModelStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onModelChanged: EventEmitter<ICredentials> = new EventEmitter<ICredentials>();

  public signInFormGroup: FormGroup;
  public fm: any;

  constructor(private fb: FormBuilder,
              public modelFormErrors: CheckoutSignInErrors,
              private userService: UserService) {
    super();

    const user: IUser = this.userService.user$.getValue();

    this.createForm(user);

    this.fm = this.modelFormErrors.formErrors;
    super.setData(this.signInFormGroup, this.modelFormErrors);


    this.modelForm.get('email').valueChanges
      .merge(this.modelForm.get('password').valueChanges)
      .subscribe(() => {
        this.setGlobal(false);
        this.onModelChanged.emit(CheckoutSignInComponent.createCredentials(this.modelForm.value));
        super.onValueChanged();
      });

    this.modelForm.statusChanges
      .subscribe(
        (value: string) => {
          let state: boolean = false;
          if (value === 'VALID') {
            state = true;
          }

          this.onModelStateChanged.emit(state);
        }
      );
  }

  public closeError(field: string): void {
    this.fm[field] = null;
  }

  public ngOnChanges() {
    this.setGlobal(this.isGlobalValidate);
    super.onValueChanged();
  }

  private createForm(user: IUser): void {
    this.signInFormGroup = this.fb.group({
      email: [user ? user.email : null, [
        Validators.required,
        Validators.pattern(REGEX_EMAIL_PATTERN)
      ]],
      password: [null, [
        Validators.required
      ]],
      isGlobalValidate: [this.isGlobalValidate]
    });
  }

  public setGlobal(value: boolean): void {
    this.modelForm.controls['isGlobalValidate'].setValue(value);
  }

  public static createCredentials(model: any): ICredentials {
    return {
      email: model.email,
      password: model.password
    };
  }
}