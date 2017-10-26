import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'fmp-basket-cart-component',
  templateUrl: 'basket-cart.html',
  styles: [require('./basket-cart.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class BasketCartComponent {
  constructor(private router: Router) {
  }

  public goCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}