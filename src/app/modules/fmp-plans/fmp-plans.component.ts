import {Component, Input, ViewEncapsulation} from '@angular/core';

import {IFmpPlanEntity} from './fmp-plans.model';

@Component({
  selector: 'fmp-plans-component',
  templateUrl: 'fmp-plans.component.html',
  styles: [require('./fmp-plans.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class FmpPlansComponent {

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  plans: Array<IFmpPlanEntity>;

  @Input()
  currentPlanTitle: string;
  /*Title of current plan*/

  @Input()
  isOpen: boolean = false;

  /**
   * Default link to route
   * @type {string}
   */
  public defaultLink: string = 'career-finder';
}