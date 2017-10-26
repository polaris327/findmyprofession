import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {IPayerInfo} from './payment-info.model';
import {PaymentInfoValidator} from './payment-info.validator';
import {ShowValidationErrors} from '../../../core/validators/show-validation-errors.model';
import {PaymentInfoErrors} from './payment-info-errors.model';
import {CoreUtilitiesService} from '../../../core/services/core-utilities.service';

@Component({
  selector: 'fmp-payment-info-component',
  templateUrl: 'payment-info.html',
  styles: [require('./payment-info.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutPaymentInfoComponent extends ShowValidationErrors implements OnChanges {

  @Input()
  resetTime: string;

  @Input()
  isGlobalValidate: any;

  @Output()
  onModelChanged: EventEmitter<IPayerInfo> = new EventEmitter<IPayerInfo>();

  @Output()
  onModelStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  public fm: any;

  public ngOnChanges(changes: SimpleChanges): void {

    if (changes['resetTime'] && changes['resetTime'].currentValue) {
      this.resetForm();
    }

    if (changes['isGlobalValidate'] && changes['isGlobalValidate'].currentValue) {
      this.paymentForm.controls['isGlobalValidate'].setValue(this.isGlobalValidate);
      super.onValueChanged();
    }

  }

  public paymentForm: FormGroup;

  private configType: any;
  private configs: any = {
    '14': [/[1-9]/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    '15': [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
    '16': [/[1-9]/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]
  };

  public cardNumberConfig: any = {
    mask: this.configs['16'],
    guide: false,
    keepCharPositions: true,
    type: 'default'
  };

  public monthConfig: any = {
    mask: [
      /[0-9]/, /\d/
    ],
    guide: false,
    keepCharPositions: true
  };

  public yearMask: any = {
    mask: [
      /[1-9]/, /\d/
    ],
    guide: false,
    keepCharPositions: true
  };

  public cvcMask: any = {
    mask: [
      /[0-9]/, /\d/, /\d/, /\d/
    ],
    guide: false,
    keepCharPositions: true
  };

  public cardNumberShow: boolean = true;

  constructor(private fb: FormBuilder,
              public modelFormErrors: PaymentInfoErrors,
              private changeDetector: ChangeDetectorRef) {

    super();

    this.paymentForm = this.fb.group({
      number: ['', [
        Validators.required,
        PaymentInfoValidator.cardNumberValidator
      ]],
      exp_month: ['', [
        Validators.required
      ]],
      exp_year: ['', [
        Validators.required
      ]],
      cvc: ['', [
        Validators.required,
        PaymentInfoValidator.cardValidateCVC
      ]],
      isGlobalValidate: [false]
    });

    super.setData(this.paymentForm, this.modelFormErrors);

    this.fm = this.modelFormErrors.formErrors;

    this.paymentForm.statusChanges
      .subscribe(
        (value: string) => {
          let state: boolean = false;
          if (value === 'VALID') {
            state = true;
          }
          this.onModelStateChanged.emit(state);
        }
      );

    const expMonth: Observable<any> =  this.getForm('exp_month').valueChanges;
    const expYear: Observable<any> =  this.getForm('exp_year').valueChanges;

    expMonth.merge(expYear)
      .subscribe(() => {

        let value: any =
          PaymentInfoValidator.cardValidateExpiry(
            this.getForm('exp_month'),
            this.getForm('exp_year')
          );

        if (value) {
          this.getForm('exp_month').setErrors(value);
          this.getForm('exp_year').setErrors(value);
        } else {
          this.getForm('exp_month').setErrors(null);
          this.getForm('exp_year').setErrors(null);
        }
      });

    this.paymentForm.valueChanges
      .subscribe(() => {
        this.onModelChanged.emit(CheckoutPaymentInfoComponent.parseModel(this.paymentForm.value));
        super.onValueChanged();
      });
  }

  /**
   * Check for card number length and change mask
   */
  public cardNumberBlur(): void {
    const str: string = CoreUtilitiesService.removeSpaces(this.getForm('number').value);
    if (str) {
      const length: number = str.length;
      if (length >= 14 && length <= 16) {
        this.cardNumberConfig.mask = this.configs[length.toString()];
        this.configType = length;
        this.updateCardNumberField();
      }
    }
  }

  private updateCardNumberField(): void {
    this.cardNumberShow = false;
    this.changeDetector.detectChanges();
    this.cardNumberShow = true;
  }

  public closeError(field: string): void {
    this.fm[field] = null;
  }

  private resetForm(): void {
    this.modelForm.reset();
  }

  private getForm(name: string): AbstractControl {
    return this.paymentForm.get(name);
  }

  private static parseModel(model: any): IPayerInfo {
    return {
      number: model.number ? model.number.toString().replace(/ /g, '') : model.number,
      cvc: model.cvc,
      exp_month: model.exp_month,
      exp_year: CheckoutPaymentInfoComponent.parseYear(model.exp_year)
    };
  }

  private static parseYear(year: string | number = ''): number {
    if (year && year.toString() && year.toString().length === 2) {
      return Number(`20${year}`);
    }
    return Number(year);
  }
}