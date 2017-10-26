import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'price-box-tab-component',
  templateUrl: 'price-box-tab.component.html'
})

export class PriceBoxTabComponent {

  @Input()
  tabData: any;

  @Input()
  isInBasket: boolean = false;

  @Output()
  onBuy: EventEmitter<null> = new EventEmitter<null>();

  public buttonClicked(): void {
    this.onBuy.emit();
  }

}