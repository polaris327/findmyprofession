import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'fmp-modal-close-icon',
  templateUrl: 'modal-close-icon.html',
})
export class ModelCloseIconComponent {

  @Output()
  onModalClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public closeClicked(event: MouseEvent): void {
    this.onModalClose.emit(event);
  }
}