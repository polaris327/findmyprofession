import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BasketService} from '../services/basket.service';
import {IBasketItem} from '../models/basket.model';
import {Injectable} from '@angular/core';

@Injectable()
export class CheckoutGuard implements CanLoad, CanActivate {

  constructor(private router: Router,
              private basketService: BasketService) {}

  public canLoad(): Observable<boolean> {
    return this.check();
  }

  public canActivate(): Observable<boolean> {
    return this.check();
  }

  private check(): Observable<boolean> {
    const basket: Array<IBasketItem> = this.basketService.basket$.getValue();
    if (!Array.isArray(basket) || basket.length < 1){
      this.router.navigate(['/career-finder']);
      return Observable.of(false);
    }
    return Observable.of(true);
  }
}