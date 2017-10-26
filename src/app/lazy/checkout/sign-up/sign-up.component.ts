import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {SignUpErrors} from './sign-up.model';
import {ShowValidationErrors} from '../../../core/validators/show-validation-errors.model';
import {REGEX_EMAIL_PATTERN} from '../../../core/validators/validation-patterns.model';
import {CustomValidators} from '../../../core/validators/validators.service';
import {ICredentials} from '../checkout.model';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-sign-up-component',
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent extends ShowValidationErrors implements OnChanges, OnDestroy {

  @Input()
  getModel: string;

  @Input()
  isGlobalValidate: string;

  @Output()
  onStatusChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onModelChanged: EventEmitter<ICredentials> = new EventEmitter<ICredentials>();

  public fm: any;
  public modelForm: FormGroup;
  private destroyed$: Subject<any> = new Subject<any>();
  private fields: Array<string>;

  constructor(private fb: FormBuilder,
              public errorFormModel: SignUpErrors) {
    super();

    this.buildForm();

    this.watchForFields();
  }

  public closeError(field: string): void {
    this.fm[field] = null;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const change: SimpleChange = changes['isGlobalValidate'];
    if (change && !change.firstChange && change.currentValue) {
      this.modelForm.controls['isGlobalValidate'].setValue(true);
      super.onValueChanged();
    }

    const getModel: SimpleChange = changes['isGlobalValidate'];
    if (getModel && getModel.currentValue) {
      this.onModelChanged.emit(this.getCredentials());
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    super.clearErrors();
  }

  private buildForm(): void {
    this.fm = this.errorFormModel.formErrors;

    this.modelForm = this.fb.group({
      full_name: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      email: [null, [
        Validators.required,
        Validators.pattern(REGEX_EMAIL_PATTERN)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        CustomValidators.passwordValidator
      ]],
      confirm_password: [null, [
        Validators.required
      ]],
      isGlobalValidate: [{
        value: false,
        disabled: true
      }]
    });
    super.setData(this.modelForm, this.errorFormModel);

    this.fields = Object.keys(this.modelForm.value).map((field: string) => field);
  }

  private watchForFields(): void {
    let observers: Array<Observable<AbstractControl>> = this.fields.map((field: string) => this.modelForm.get(field).valueChanges);

    Observable.merge(...observers)
      .takeUntil(this.destroyed$)
      .subscribe(
        () => {
          super.clearErrors();
          this.onModelChanged.emit(this.getCredentials());
          this.onStatusChanged.emit(this.modelForm.valid);
        }
      );
  }

  /**
   * Method to create object of credentials
   * @returns {ICredentials}
   */
  private getCredentials(): ICredentials {
    return <ICredentials>this.modelForm.value;
  };
}