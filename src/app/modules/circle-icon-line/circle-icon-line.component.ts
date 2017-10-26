import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-circle-icon-line',
  templateUrl: 'circle-icon-line.html',
  styles: [require('./styles/circle-icon-line.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class CircleIconLineComponent {

  @Input()
  icon: string;

}