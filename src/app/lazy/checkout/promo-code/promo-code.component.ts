import {Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';

import {PaymentService} from '../../../core/services/payment.service';
import {IPayment} from '../../../core/models/payment.model';
import {CheckoutService} from '../checkout.service';
import {PromoCheckStatus, PromoCodeError, PromoCodeResponse} from './promo-code.model';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-promo-code-component',
  templateUrl: 'promo-code.html',
  styles: [require('./promo-code.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class PromoCodeComponent implements OnDestroy {

  @Input()
  placeholder: string = 'Promo Code';

  public payment: IPayment;

  public promo_code: string;

  public errorMessage: string | null = null;

  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private paymentService: PaymentService,
              private checkoutService: CheckoutService) {

    this.subscribeToPayment();
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.paymentService.removePromoCode();
  }

  public closeError(): void {
    this.errorMessage = null;
  }

  public checkPromoCode(): void {
    this.checkoutService.checkCoupon(this.promo_code)
      .map((response: PromoCodeResponse) => {
        response.code = this.promo_code;
        return response;
      })
      .subscribe(
        (response: PromoCodeResponse) => {
          const promo: PromoCheckStatus = this.paymentService.addPromoCode(response);
          if (!promo.status) {
            this.errorMessage = promo.message;
          } else {
            this.closeError();
          }
        },
        (error: PromoCodeError) => this.errorMessage = error.body
      );
  }

  private subscribeToPayment(): void {
    this.paymentService.payment$
      .takeUntil(this.destroyed$)
      .subscribe(
        (payment: IPayment) => {
          this.payment = payment;

          if (this.payment && this.payment.promo_code) {
            this.promo_code = payment.promo_code.code;
          }
        }
      );
  }
}