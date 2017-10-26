import {Component, Input, ViewEncapsulation} from '@angular/core';

import {HomePage} from '../../home.model';

@Component({
  selector: 'fmp-home-description-component',
  templateUrl: 'home-description.component.html',
  styles: [require('./home-description.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class HomeDescriptionComponent {

  @Input()
  componentData: HomePage.IPageContent;

}
