import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AccordionTabQuestionsComponent} from './accordion-tab-questions.component';
import {CustomDropdownModule} from '../../../../../modules/custom-dropdown/custom-dropdown.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDropdownModule
  ],
  declarations: [
    AccordionTabQuestionsComponent
  ],
  exports: [
    AccordionTabQuestionsComponent
  ]
})
export class AccordionTabQuestionsModule {}