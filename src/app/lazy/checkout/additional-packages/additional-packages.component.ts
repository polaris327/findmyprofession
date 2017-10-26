import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {IAdditionalPackage} from './additional-packages.model';
import {PaymentService} from '../../../core/services/payment.service';
import {Subscription} from 'rxjs/Subscription';
import {IPayment} from '../../../core/models/payment.model';

@Component({
  selector: 'fmp-checkout-additional-packages',
  templateUrl: 'additional-packages.html',
  styles: [require('./additional-packages.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class CheckoutAdditionalPackagesComponent implements OnDestroy {

  @Input()
  public packages: Array<IAdditionalPackage>;

  @Input()
  price: number;

  @Output()
  onPackageRemove: EventEmitter<IAdditionalPackage> = new EventEmitter<IAdditionalPackage>();

  public payment: IPayment;
  public paymentSubscription: Subscription;

  constructor(private paymentService: PaymentService) {
    this.paymentSubscription = this.paymentService.payment$
      .subscribe(
        (payment: IPayment) => {
          this.payment = payment;
        }
      );
  }

  public removePackage(item: IAdditionalPackage): void {
    if (item) {
      this.onPackageRemove.emit(item);
    }
  }

  public ngOnDestroy() {
    if (this.paymentSubscription) {
      this.paymentSubscription.unsubscribe();
    }
  }
}