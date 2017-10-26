import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-free-consultation-calendly-component',
  templateUrl: 'free-consultation-calendly.html',
  styles: [require('./free-consultation-calendly.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FreeConsultationComponent {

  @Input()
  content: any;

}