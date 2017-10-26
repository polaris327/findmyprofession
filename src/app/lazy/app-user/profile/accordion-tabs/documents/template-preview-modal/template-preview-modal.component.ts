import {Component, ViewEncapsulation} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fmp-template-preview-modal',
  templateUrl: 'template-preview-modal.html',
  styles: [require('./template-preview-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class TemplatePreviewModalComponent {

  public preview: string;

  constructor(private modalService: NgbActiveModal) {}

  public closeModal(): void {
    this.modalService.close();
  }

}