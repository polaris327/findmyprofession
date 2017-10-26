import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-rating-stars-component',
  templateUrl: 'rating-stars.html',
  styles: [require('./rating-stars.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class RatingStarsComponent implements OnChanges {

  @Input()
  stars: number = 0;

  public items: Array<any>;

  public ngOnChanges(changes: SimpleChanges) {
    this.items = new Array(changes['stars'].currentValue);
  }
}