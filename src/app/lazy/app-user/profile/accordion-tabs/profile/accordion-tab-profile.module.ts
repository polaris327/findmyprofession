import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionTabProfileComponent} from './accordion-tab-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputPhoneNumberModule} from '../../../../../modules/input-phone-number/input-phone-number.module';
import {AccordionTabProfileErrors} from './accordion-tab-profile.model';
import {ErrorModule} from '../../../../../modules/error/error.module';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';

import {CalendarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputPhoneNumberModule,
    ErrorModule,
    GooglePlaceModule,
    CalendarModule
  ],
  providers: [
    AccordionTabProfileErrors
  ],
  declarations: [
    AccordionTabProfileComponent
  ],
  exports: [
    AccordionTabProfileComponent
  ]
})

export class AccordionTabProfileModule {}
