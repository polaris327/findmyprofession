import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CoreUtilitiesService} from '../../../../../../core/services/core-utilities.service';
import {AlertModalComponent} from '../../../../../../modules/alert-modal/alert-modal.component';

@Component({
  selector: 'fmp-file-selector-component',
  templateUrl: 'file-selector.html'
})
export class FmpFileSelectorComponent {

  @ViewChild('fileSelector')
  fileSelector: any;

  @Input()
  fileName: string;

  @Input()
  isSelected: boolean = false;

  @Input()
  isDisabled: boolean = false;

  @Output()
  onFileSelected: EventEmitter<File> = new EventEmitter<File>();

  @Output()
  onFileRemoved: EventEmitter<undefined> = new EventEmitter<undefined>();

  public acceptFormats: Array<string>;

  public attachFile(): void {
    if (this.isSelected) {
      this.onFileRemoved.emit();
    } else {
      this.fileSelector.nativeElement.click();
    }
  }

  public fileSelected($event: any): void {
    let fileList: FileList = $event.target.files;
    if (fileList[0]) {
      const file: File = fileList[0];
      $event.target.value = null;
      const isFormatValid: boolean = CoreUtilitiesService.checkFileExtension(file);

      if (!isFormatValid) {
        const modalRef: NgbModalRef = this.modalService.open(AlertModalComponent);
        modalRef.result
          .then(
            () => {},
            () => {}
          );
        modalRef.componentInstance.showButtons = false;
        modalRef.componentInstance.message = `File you want upload has unsupported format. Please select another. Accept formats: ${this.acceptFormats.join(' ; ')}`;
      } else {
        this.onFileSelected.emit(file);
      }
    }
  }

  constructor(private modalService: NgbModal) {
    this.acceptFormats = CoreUtilitiesService.fileAcceptFormats;
  }
}