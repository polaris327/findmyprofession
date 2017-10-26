import {ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BasketService} from '../../core/services/basket.service';
import {IBasketItem} from '../../core/models/basket.model';
import {IAdditionalPackage} from './additional-packages/additional-packages.model';
import {PaymentService} from '../../core/services/payment.service';
import {IPayment, IPromoCode} from '../../core/models/payment.model';
import {UserService} from '../../core/services/user.service';
import {IUser} from '../../core/models/user.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ICredentials, IPaymentInfo, IPaymentItem, IPaymentResponse, PaymentDiscount} from './checkout.model';
import {IPayerInfo} from './payment-info/payment-info.model';
import {CheckoutService} from './checkout.service';
import {ICareerFinderPackage} from '../career-finder-congratulation/career-finder-congratulation.model';
import {IErrorResponse} from '../../core/models/core.model';
import {Subject} from 'rxjs/Subject';
import {PlatformCheckService} from '../../core/services/platform-check.service';

@Component({
  selector: 'checkout-component',
  templateUrl: 'checkout.component.html',
  styles: [require('./checkout.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class CheckoutComponent implements OnInit, OnDestroy {

  public getModelTime: string;
  public careerFinderPercent: number = 1;

  public modelForm: FormGroup;
  public isRequestSending: boolean = false;

  public isGlobalValidate: any;

  public basket: Array<IAdditionalPackage>;

  public user: IUser;

  public isAuth: boolean = false;

  public signInState: boolean = true;

  public basketPrice: number;

  public errorMessage: string | null = null;

  public paymentFormReset: string;
  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private basketService: BasketService,
              private paymentService: PaymentService,
              private userService: UserService,
              private fb: FormBuilder,
              private checkoutService: CheckoutService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private platformCheckService: PlatformCheckService,
              private domRenderer: Renderer2) {

    this.buildForm();

    this.createComponentSubscriptions();
  }

  public isSendBtnDisabled(): boolean {
    return !this.modelForm.get('amount').value || this.isRequestSending || !this.modelForm.get('agreement').value;
  }

  public authModelStateChanged(state: boolean): void {
    this.modelForm.controls['authState'].setValue(state);
  }

  public paymentModelStateChanged(state: boolean): void {
    this.modelForm.controls['paymentState'].setValue(state);
  }

  public paymentModelChanged(model: IPayerInfo): void {
    this.modelForm.controls['paymentModel'].setValue(model);
  }

  public authModelChanged(credentials: ICredentials): void {
    this.modelForm.controls['authModel'].setValue(credentials);
  }

  public ngOnInit(): void {
    if (this.paymentService) {
      this.paymentService.updatePayment();
    }

    if (this.platformCheckService.isBrowser) {
      this.loadStripeScript();
    }
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.changeDetector.detach();
  }

  public changeState(isSignIn: boolean): void {
    this.signInState = isSignIn;
  }

  public removeItem(item: IBasketItem): void {
    this.basketService.removeItem(item);
    this.paymentService.updatePayment();
  }

  private createComponentSubscriptions(): void {
    this.createBasketSubscriptions(this.route.snapshot.data['content']);

    this.createPaymentSubscription();

    this.createUserSubscription();

    this.createAuthSubscription();
  }

  private createPaymentSubscription(): void {
    this.paymentService.payment$
      .takeUntil(this.destroyed$)
      .map((payment: IPayment) => payment.total)
      .filter((total: number) => !Number.isNaN(total))
      .subscribe(
        (total: number) => this.modelForm.controls['amount'].setValue(total)
      );
  }

  private createUserSubscription(): void {
    this.userService.user$
      .takeUntil(this.destroyed$)
      .subscribe(
        (user: IUser) => this.user = user
      );
  }

  public closeError(): void {
    this.errorMessage = '';
  }

  public sendRequest(): void {

    /**
     * Setting new value to that field , to ngOnChanges detect new value
     * @type {string}
     */
    this.isGlobalValidate = Date.now().toString();
    this.closeError();
    this.getModelTime = Date.now().toString();

    this.changeDetector.detectChanges();

    if (this.modelForm.valid) {
      const payer_info: IPayerInfo = this.getControlValue('paymentModel');
      const credentials: ICredentials = this.getControlValue('authModel');
      const payment_info: IPaymentInfo = {
        amount: this.getControlValue('amount'),
        description: this.basketService.convertToDescription()
      };

      const payer_basket: Array<IPaymentItem> = this.basket.map((item: IBasketItem) => {
        return {
          title: item.title,
          price: item.price,
          plan: item.plan,
          id: item.id
        };
      });

      const promo: IPromoCode = this.paymentService.payment$.getValue().promo_code;
      const discount: PaymentDiscount = {
        code: promo ? promo.code : null
      };

      /**
       * Check for Career Finder percent and price
       */
      if (this.checkForCareerFinder(payer_basket, this.careerFinderPercent)) {
        this.isRequestSending = true;
        CheckoutService.createRequest(payer_info, credentials, payment_info, payer_basket, discount)
          .flatMap((response) => this.checkoutService.sendRequest(response))
          .filter((paymentResponse: IPaymentResponse) => !!paymentResponse && !!paymentResponse.user)
          .finally(() => this.isRequestSending = false)
          .subscribe(
            (paymentResponse: IPaymentResponse) => this.paymentExecuted(paymentResponse),
            (error: IErrorResponse) => this.handleError(error)
          );
      }
    }
    else {
      this.errorMessage = `Payment form contain errors`;
    }
  }

  private paymentExecuted(paymentResponse: IPaymentResponse): void {
    if (!this.isAuth) {
      this.userService.signIn(paymentResponse.user, true);
    }
    this.userService.user$.next(paymentResponse.user);
    this.modelForm.reset();
    this.paymentFormReset = Date.now().toString();
    this.basketService.clearBasket();
    this.isRequestSending = false;

    this.changeDetector.detectChanges();

    this.router.navigate(['/home']);
  }

  private createAuthSubscription(): void {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => {
          if (this.modelForm) {
            this.modelForm.controls['authState'].setValue(state);
          }
          this.isAuth = state;
        }
      );
  }

  private getControlValue(name: string): any {
    const control: AbstractControl = this.modelForm.get(name);
    return control ? control.value : control;
  }

  private createBasketSubscriptions(packages: Array<ICareerFinderPackage>): void {
    if (packages) {
      const packageMap: Map<number, ICareerFinderPackage> = new Map<number, ICareerFinderPackage>();
      packages.forEach((item: ICareerFinderPackage) => {
        packageMap.set(item.id, item);
        if (item.id === 1) {
          this.careerFinderPercent = item.price_senior;
        }
      });

      this.basketService.basket$
        .takeUntil(this.destroyed$)
        .filter((items: Array<IBasketItem>) => Array.isArray(items))
        .map((items: Array<IBasketItem>) => {
          items.forEach((item: IAdditionalPackage) => {
            const packageItem: ICareerFinderPackage = packageMap.get(item.id);
            if (packageItem) {
              item.icon = packageItem.icon;
            }
          });
          return [...items];
        })
        .subscribe(
          (items: Array<IBasketItem>) => this.basket = items
        );
    }
  }

  private handleError(error: IErrorResponse): void {
    this.isRequestSending = false;
    this.errorMessage = error.message;
    this.changeDetector.detectChanges();
  }

  private buildForm(): void {
    this.modelForm = this.fb.group({
      authState: [this.isAuth || false, [
        Validators.requiredTrue
      ]],
      authModel: [null],
      paymentState: [false, [
        Validators.requiredTrue
      ]],
      paymentModel: [null],
      amount: [0, []],
      agreement: [false, [
        Validators.requiredTrue
      ]]
    });
  }

  private checkForCareerFinder(list: Array<IPaymentItem>, percent: number = 1): boolean {
    const finder: IPaymentItem = list.find((item: IPaymentItem) => item.id === 1);
    if (finder && percent) {
      const minValue: number = percent * 1000;
      if (+finder.plan !== percent) {
        this.errorMessage = 'Your Career Finder percent is different from current.';
        return false;
      }
      if (finder.price < minValue) {
        this.errorMessage = 'Your Career Finder price is too small.';
        return false;
      }
    }
    return true;
  }

  private loadStripeScript(): void {
    if (window && !window['isStripeScriptLoaded']) {
      const script = this.domRenderer.createElement('script');
      script.src = 'https://js.stripe.com/v2/';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      window['isStripeScriptLoaded'] = true;
    }
  }
}