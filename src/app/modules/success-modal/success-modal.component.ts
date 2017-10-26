import {Component, ViewEncapsulation} from '@angular/core';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fmp-success-modal-component',
  templateUrl: 'success-modal.html',
  styles: [require('./success-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class SuccessModalComponent {

  public message: string = '';
  public icon: string;

  public confirm(): void {
    this.activeModal.close('remove close');
  }

  public cancel(): void {
    this.activeModal.dismiss('Cancel close');
  }

  constructor(public activeModal: NgbActiveModal) {}
}