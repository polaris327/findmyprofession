import {Injectable} from '@angular/core';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertModalComponent} from '../../modules/alert-modal/alert-modal.component';

@Injectable()
export class ModalCreatorService {

  constructor(private modalService: NgbModal) {}

  public openLikeWarning(): void {
    const modal: NgbModalRef = this.modalService.open(AlertModalComponent);
    modal.componentInstance.title = 'Oops!';
    modal.componentInstance.showButtons = false;
    modal.componentInstance.type = 'like';
  }

}