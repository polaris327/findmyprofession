import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CircleIconLineModule} from "../circle-icon-line/circle-icon-line.module";
import {SuccessModalComponent} from './success-modal.component';
import {ModelCloseIconModule} from '../modal-close-icon/modal-close-icon.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    CircleIconLineModule,
    ModelCloseIconModule
  ],
  exports: [
    SuccessModalComponent
  ],
  declarations: [
    SuccessModalComponent
  ],
  entryComponents: [
    SuccessModalComponent
  ]
})
export class SuccessModalModule {}
