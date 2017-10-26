import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IBasketItem} from '../../../../core/models/basket.model';

@Component({
  selector: 'fmp-price-box-component',
  templateUrl: 'price-box.component.html',
  styles: [require('./fmp-price-box.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class PriceBoxComponent {

  @Input()
  prices: any;

  @Input()
  inBasket: any;

  @Output()
  onBuy: EventEmitter<any> = new EventEmitter<any>();

  public packageBuy(event: any): void {
    const item: IBasketItem = {
      plan: event.title,
      price: event.price,
      id: this.prices.id
    };
    this.onBuy.emit(item);
  }

}