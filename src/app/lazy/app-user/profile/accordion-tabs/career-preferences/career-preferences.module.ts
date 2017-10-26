import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AccordionTabCareerPreferencesComponent} from './career-preferences.component';
import {RlTagInputModule} from 'angular2-tag-input/dist';
import {CustomDropdownModule} from '../../../../../modules/custom-dropdown/custom-dropdown.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomDropdownModule,
    RlTagInputModule
  ],
  declarations: [
    AccordionTabCareerPreferencesComponent
  ],
  exports: [
    AccordionTabCareerPreferencesComponent
  ]
})
export class CareerPreferencesModule {}
