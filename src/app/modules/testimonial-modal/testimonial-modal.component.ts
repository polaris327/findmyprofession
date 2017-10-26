import {Component, ViewEncapsulation} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fmp-testimonial-modal-component',
  templateUrl: 'testimonial-modal.html',
  styles: [require('./testimonial-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialModalComponent {

  public testimonial: any;

  public message: string = '';
  public title: string = 'Warning';
  public showButtons: boolean = true;
  public type: string = 'common';


  public close(): void {
    this.activeModal.close('Close');
  }

  constructor(public activeModal: NgbActiveModal) {
  }
}