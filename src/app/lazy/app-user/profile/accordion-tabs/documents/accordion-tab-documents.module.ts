import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomFileDropModule} from './custom-file-drop/custom-file-drop.module';
import {AccordionTabDocumentsComponent} from './accordion-tab-documents-component';
import {DocumentTableComponent} from './document-table/document-table.component';
import {DocumentTemplatesComponent} from './document-templates/document-templates.component';
import {CustomDropdownModule} from '../../../../../modules/custom-dropdown/custom-dropdown.module';
import {SharedModule} from '../../../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CustomFileDropModule,
    CustomDropdownModule,
    SharedModule
  ],
  declarations: [
    AccordionTabDocumentsComponent,
    DocumentTableComponent,
    DocumentTemplatesComponent
  ],
  exports: [
    AccordionTabDocumentsComponent
  ]
})
export class AccordionTabDocumentModule {}