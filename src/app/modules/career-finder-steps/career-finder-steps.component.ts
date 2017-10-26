import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'fmp-career-finder-steps-component',
  templateUrl: 'career-finder-steps.html',
  styles: [require('./career-finder-steps.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CareerFinderStepsComponent {

  @Input()
  buttonText: string = 'Have FMP Apply';

  @Input()
  type: string;

  @Output()
  onButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  public buttonClicked(): void {
    this.onButtonClicked.emit();
  }

}