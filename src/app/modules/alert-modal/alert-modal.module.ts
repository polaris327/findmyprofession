import {NgModule} from '@angular/core';
import {AlertModalComponent} from './alert-modal.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {CircleIconLineModule} from "../circle-icon-line/circle-icon-line.module";
import {ModelCloseIconModule} from '../modal-close-icon/modal-close-icon.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    CircleIconLineModule,
    RouterModule,
    ModelCloseIconModule
  ],
  exports: [
    AlertModalComponent
  ],
  declarations: [
    AlertModalComponent
  ],
  entryComponents: [
    AlertModalComponent
  ]
})
export class AlertModalModule {}
