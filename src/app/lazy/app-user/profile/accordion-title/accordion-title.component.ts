import {Component, Input} from '@angular/core';

@Component({
  selector: 'fmp-accordion-title-component',
  templateUrl: 'accordion-title.html'
})

export class AccordionTitleComponent {

  @Input()
  title: string;

  @Input()
  iconSrc: string;

}