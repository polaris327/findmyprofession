import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IPayment} from '../models/payment.model';
import {IBasketItem} from '../models/basket.model';
import {BasketService} from './basket.service';
import {PromoCheckStatus, PromoCodeResponse, PromoCodeService} from '../../lazy/checkout/promo-code/promo-code.model';

@Injectable()
export class PaymentService {

  public payment$: BehaviorSubject<IPayment>;

  constructor(private basketService: BasketService) {
    this.payment$ = new BehaviorSubject<IPayment>(this.createPayment());

    this.basketService.basket$
      .filter((items: Array<IBasketItem>) => Array.isArray(items))
      .subscribe(
        (items: Array<IBasketItem>) => this.updatePayment()
      );
  }

  public removePromoCode(): void {
    const payment: IPayment = this.payment$.getValue();
    if (payment) {
      payment.promo_code = null;
      PaymentService.calculateTotal(payment);

      this.payment$.next(payment);
      this.updatePayment();
    }
  }

  public addPromoCode(promo: PromoCodeResponse): PromoCheckStatus {
    const items: Array<IBasketItem> = this.basketService.basket$.getValue();

    if (Array.isArray(items) && items.length) {
      const isValid: any = items.some((item: IBasketItem) => promo.services.some((promoService: PromoCodeService) => promoService.id === item.id));
      if (isValid) {
        const payment: IPayment = this.payment$.getValue();
        if (payment) {
          payment.promo_code = {
            code: promo.code,
            type: promo.type,
            value: promo.value
          };
          PaymentService.calculateTotal(payment);

          this.payment$.next(payment);
          this.updatePayment();
        }
        return {status: true};
      } else {
        return {status: false, message: 'Coupon not valid with items.'}
      }
    }
    return {status: false, message: 'Your basket is empty'};
  }

  public updatePayment(): void {
    const items: Array<IBasketItem> = this.basketService.basket$.getValue();
    if (items) {
      const payment: IPayment = this.payment$.getValue();
      const price: number = PaymentService.getBasketPrice(items);

      if (payment) {
        payment.sub_total = price;
      }

      PaymentService.calculateTotal(payment);
      this.payment$.next(payment);
    }
  }

  private createPayment(): IPayment {
    const payment: IPayment = {
      sub_total: PaymentService.getBasketPrice(this.basketService.basket$.getValue())
    };

    PaymentService.calculateTotal(payment);

    return payment;
  }

  private static calculateTotal(payment: IPayment): void {
    if (payment.promo_code) {
      if (payment.promo_code.type === 'fixed') {
        payment.total = Math.round(payment.sub_total - payment.promo_code.value);
      } else {
        payment.total = +(payment.sub_total * ((100 - payment.promo_code.value) / 100));
      }
    } else {
      payment.total = payment.sub_total;
    }
  }

  private static getBasketPrice(items: Array<IBasketItem>): number {
    if (items && items.length > 0) {
      return items
        .map((item: IBasketItem) => item.price || 0)
        .reduce((a: number, b: number) => a + b);
    }
    return 0;
  }
}