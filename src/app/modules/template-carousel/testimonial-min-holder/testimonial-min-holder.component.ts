import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'testimonial-min-holder-component',
  templateUrl: 'testimonial-min-holder.component.html',
  styles: [require('./testimonial-min-holder.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialsMinHolderComponent {

  @Input()
  currentSlide: any;

  @Output()
  onTestimonialOpen: EventEmitter<any> = new EventEmitter<any>();

  public openTestimonial(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    this.onTestimonialOpen.emit(this.currentSlide);
  }
}