import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {HomePage} from '../../lazy/home/home.model';

@Component({
  selector: 'career-finder-slider-component',
  templateUrl: 'career-finder-slider.component.html',
  styles: [require('./career-finder-slider.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CareerFinderSliderComponent {

  @Input()
  type: string;

  @Input()
  currentValue: number = 1000;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  percent: number;

  @Input()
  footer: string;

  @Input()
  packagesTitle: string;

  @Input()
  packages: Array<string>;

  @Input()
  serviceData: HomePage.IPageContent;

  @Output()
  onGetStarted: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  onCareerFinderDetailsOpen: EventEmitter<any> = new EventEmitter<any>();

  public getStartedClicked(): void {
    this.onGetStarted.emit();
  }

  public openCareerFinderDetails(event: MouseEvent, url: string): void {
    this.onCareerFinderDetailsOpen.emit({
      event, url
    });
  }
}