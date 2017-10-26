import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {IBasket, IBasketItem, IPromoCode} from '../models/basket.model';
import {StoreService} from './store.service';

@Injectable()
export class BasketService {

  public readonly storeBasketToken: string = '_busket_';

  public basket$: BehaviorSubject<Array<IBasketItem>>;

  constructor(private storeService: StoreService) {
    this.basket$ = new BehaviorSubject<Array<IBasketItem>>(this.getLocalBasket());

  }

  /**
   * Clear all basket
   */
  public clearOut(): void {
    if (this.basket$) {
      this.basket$.next([]);
    }
  }

  /**
   * Add new item to basket stream
   * @param item
   */
  public addNewItem(item: IBasketItem): void {
    if (this.basket$) {
      const basket = [...this.basket$.getValue()];

      if (Array.isArray(basket)) {
        let contain: IBasketItem = basket.filter((element: IBasketItem) => {
          return element.title === item.title;
        })[0];

        if (contain) {
          contain.price = item.price;
          contain.plan = item.plan;
        } else {
          basket.push(item);
          this.basket$.next(basket);
        }

        this.updateLocalBasket();
      }
    }
  }

  /**
   * Remove item from basket stream
   * @param index
   */
  public removeItemByIndex(index: number = 0): void {
    if (this.basket$) {
      const basket = [...this.basket$.getValue()];
      if (Array.isArray(basket) && basket.length > index) {
        basket.splice(index, 1);
        this.basket$.next(basket);
        this.updateLocalBasket();
      }
    }
  }

  public removeItem(item: IBasketItem): void {
    if (item) {
      const basket = [...this.basket$.getValue()];
      const index: number = basket.indexOf(item);
      if (index !== -1) {
        basket.splice(index, 1);
        this.basket$.next(basket);
        this.updateLocalBasket();
      }
    }
  }

  /**
   * Check if current basket state is empty
   * @returns {boolean}
   */
  public isEmpty(): boolean {
    return this.basket$ ? this.basket$.getValue() === [] : false;
  }

  /**
   * Method to clear basket , remove all items
   */
  public clearBasket(): void {
    this.basket$.next([]);
    this.updateLocalBasket();
  }

  public updateLocalBasket(): void {
    this.storeService.setItem(this.storeBasketToken , this.basket$.getValue());
  }

  public convertToDescription(): string{
    const basket: Array<IBasketItem> = this.basket$.getValue();
    if (Array.isArray(basket)) {
      return basket.map((item: IBasketItem) => {
        return `Service: ${item.title}. Plan: ${item.plan}. Price: $${item.price}`;
      }).join(';');
    }
  }

  private getLocalBasket(): Array<IBasketItem> {
    return this.storeService.getItem(this.storeBasketToken) || [];
  }

}