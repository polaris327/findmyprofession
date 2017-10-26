import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InputPhoneNumberComponent} from './input-phone-number.component';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule
  ],
  providers: [],
  declarations: [
    InputPhoneNumberComponent
  ],
  exports: [
    InputPhoneNumberComponent
  ]
})

export class InputPhoneNumberModule {}
