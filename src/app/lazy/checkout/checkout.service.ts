import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ICredentials, IPaymentInfo, IPaymentItem, IPaymentRequest, PaymentDiscount} from './checkout.model';
import {IPayerInfo} from './payment-info/payment-info.model';
import {IHttpRequest} from '../../core/models/core.model';
import {HttpService} from '../../core/services/http.service';
import {STRIPE_CONFIG} from '../../core/configs/stripe.config';
import {COUPON_CHECK} from '../../core/models/api-urls.model';
import {Observer} from 'rxjs/Observer';
import {CoreUtilitiesService} from '../../core/services/core-utilities.service';

@Injectable()
export class CheckoutService {

  constructor(private httpService: HttpService){}

  public static createRequest(
    payer_info: IPayerInfo,
    payer_credentials: ICredentials,
    payment_info: IPaymentInfo,
    payer_basket: Array<IPaymentItem>,
    discount: PaymentDiscount
  ): Observable<IPaymentRequest | any> {

    return Observable.create((observer: Observer<any>) => {
      Stripe.setPublishableKey(STRIPE_CONFIG.publish_key);
      Stripe.card.createToken(<StripeCardTokenData>payer_info , (status: number, response: StripeTokenResponse) => {
        if (status === 200) {
          observer.next({
            payer_credentials: payer_credentials,
            payment_info: {
              description: payment_info.description,
              amount: payment_info.amount,
              currency: 'usd',
              source: response.id
            },
            payer_basket: payer_basket,
            discount: discount,
            timezone: CoreUtilitiesService.getTimeZone()
          });
        } else {
          observer.error({
            message: response.error.message,
            status: status
          });
        }
      });
    });

  }

  public sendRequest(payment: IPaymentRequest): any {
    const request: IHttpRequest = {
      method: 'POST',
      url: '/checkout',
      body: payment,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  public checkCoupon(code: string): Observable<any> {
    const request: IHttpRequest = {
      method: 'POST',
      url: COUPON_CHECK,
      body: {code},
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

}