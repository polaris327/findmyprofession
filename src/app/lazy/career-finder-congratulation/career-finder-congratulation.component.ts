import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {IBasketItem} from '../../core/models/basket.model';
import {BasketService} from '../../core/services/basket.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IPackageSelectEvent} from './package-selector/package-selector.model';
import {ICareerFinderPackage, ISelectItem} from './career-finder-congratulation.model';
import {UserService} from '../../core/services/user.service';
import {IUser} from '../../core/models/user.model';
import {PaymentService} from '../../core/services/payment.service';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'career-finder-congratulation-component',
  templateUrl: 'career-finder-congratulation.component.html',
  styles: [require('./career-finder-congratulation.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class CareerFinderCongratulationComponent implements OnDestroy, OnInit {

  public careerFinderPrice: number = 1000;
  public sliderPercent: number = 1;

  public packages: Array<ISelectItem>;

  public basket: Array<IBasketItem>;
  private destroyed$: Subject<any> = new Subject<any>();

  public user: IUser;

  public isAuth: boolean;
  public isComponentInited: boolean = false;

  private readonly careerFinderPackage: IBasketItem = {
    id: 1,
    title: 'Career Finder',
    plan: '',
    price: 0,
    icon: 'career-finder'
  };

  constructor(private route: ActivatedRoute,
              private basketService: BasketService,
              private router: Router,
              private userService: UserService,
              private paymentService: PaymentService,
              private changeDetector: ChangeDetectorRef,
              private platformCheck: PlatformCheckService) {

    this.checkForToken();

    const allPackages: Array<ICareerFinderPackage> = route.snapshot.data['content'];

    const sortedPackages: Array<ICareerFinderPackage> = [];
    allPackages.forEach((element: ICareerFinderPackage) => {
      if (element.id === 1) {
        /**
         * Finding Career Finder
         * @type {number}
         */
        const price: number = element.price_senior;
        this.sliderPercent = price;
        this.careerFinderPackage.price = price;
        this.careerFinderPackage.plan = price.toString();
      } else {
        sortedPackages.push(element);
      }
    });

    this.createSubscriptions();

    this.setLocalPackages(sortedPackages);

  }

  public ngOnInit(): void {
    if (this.platformCheck.isBrowser) {
      this.isComponentInited = true;
    }
    this.checkForBasket();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.changeDetector.detach();
  }

  /**
   * Method to set package to basket that selected.
   * @param event
   */
  public packageSelected(event: IPackageSelectEvent): void {
    if (event) {
      if (!event.isSelected) {
        let index: number = 0;
        let contain: IBasketItem = this.basket.filter((item: IBasketItem, _index: number) => {
          if (item.title === event.fmpPlan.title) {
            index = _index;
          }
          return item.title === event.fmpPlan.title;
        })[0];
        if (contain) {
          this.basketService.removeItemByIndex(index);
        }
      } else {
        const item: IBasketItem = CareerFinderCongratulationComponent.getItemFromEvent(event);
        this.basketService.addNewItem(item);
      }
    }
  }

  /**
   * Parse object to specific model
   * @param event
   * @returns {{title: string, plan: string, price: number, icon: string, id: (number|string)}}
   */
  private static getItemFromEvent(event: any): IBasketItem {
    return {
      title: event.fmpPlan.title,
      plan: event.fmpPlan.selectedType.title,
      price: +event.fmpPlan.selectedType.price,
      icon: event.fmpPlan.icon,
      id: event.fmpPlan.id
    };
  };

  /**
   * Detecting token to add CareerFinder to basket
   */
  private checkForToken(): void {
    const basket: Array<IBasketItem> = this.basketService.basket$.getValue();

    if (basket) {
      const item: IBasketItem = basket
        .find((item: IBasketItem) => item.title === this.careerFinderPackage.title);

      if (!item) {
        this.basketService.addNewItem(this.careerFinderPackage);
      }
    }
  }

  /**
   * Updating selected package if type changed
   * @param event
   */
  public packageTypeChanged(event: any): void {
    const basket: Array<IBasketItem> = this.basketService.basket$.getValue();

    let index: number = -1;
    let item: IBasketItem = basket.filter((element: IBasketItem, _index: number) => {
      if (element.title === event.title) {
        index = _index;
      }
      return element.title === event.title
    })[0];

    if (item && index !== -1) {
      basket[index].plan = event.selectedType.title;
      basket[index].price = event.selectedType.price;
    }
  }

  public goToCheckout(): void {
    /**
     * Update root basket
     */
    this.basketService.updateLocalBasket();
    /**
     * Update root payment
     */
    this.paymentService.updatePayment();
    this.changeDetector.detectChanges();
    this.router.navigate(['/checkout']);
  }

  public careerFinderCostChanged(value: number): void {
    this.careerFinderPackage.price = value;
  }

  /**
   * Detect if there are CareerFinder in basket
   * Get price from it and set to local CareerFinder
   */
  private checkForBasket(): void {
    if (this.basket) {
      /**
       * Searching for CareerFinder package
       * @type {IBasketItem}
       */
      const careerFinder: IBasketItem = this.basket.find((item: IBasketItem) => item.id === 1);

      if (careerFinder) {
        const price: number = (careerFinder.price / (+careerFinder.plan || 1)) || 0;
        this.careerFinderPackage.price = price;

        /**
         * Link local package to
         * @type {IBasketItem}
         */
        this.basket[this.basket.indexOf(careerFinder)] = this.careerFinderPackage;

        /**
         * Set real price to career finder range
         * @type {number}
         */
        const minValue: number = this.sliderPercent * 1000;
        this.careerFinderPrice = price || minValue;
      }
    }
  }

  private setLocalPackages(packages: Array<ICareerFinderPackage>): void {
    this.packages = packages.map((item: ICareerFinderPackage) => {
      const inBasket: IBasketItem = this.basket
        .find((element: IBasketItem) => element.title === item.name);

      const senior: any = {
        title: 'Senior',
        price: item.price_senior
      };

      return {
        title: item.name,
        types: [
          senior,
          {
            title: 'Executive',
            price: item.price_executive
          }
        ],
        icon: item.icon,
        isSelected: Boolean(inBasket),
        selectedType: Boolean(inBasket) ? {title: inBasket.plan, price: inBasket.price} : senior,
        id: item.id
      };
    });
  }

  /**
   * Method that creates subscriptions
   */
  private createSubscriptions(): void {
    this.userService.user$
      .takeUntil(this.destroyed$)
      .subscribe(
        (user: IUser) => this.user = user
      );

    this.basketService.basket$
      .takeUntil(this.destroyed$)
      .filter((items: Array<IBasketItem>) => Array.isArray(items))
      .subscribe(
        (items: Array<IBasketItem>) => this.basket = items
      );

    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => this.isAuth = state
      );
  }
}