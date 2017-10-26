import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplatePreviewModalComponent} from './template-preview-modal.component';
import {ModelCloseIconModule} from '../../../../../../modules/modal-close-icon/modal-close-icon.module';
import {SharedModule} from '../../../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ModelCloseIconModule,
    SharedModule
  ],
  declarations: [
    TemplatePreviewModalComponent
  ],
  exports: [
    TemplatePreviewModalComponent
  ],
  entryComponents: [
    TemplatePreviewModalComponent
  ]
})
export class TemplatePreviewModalModule {}
