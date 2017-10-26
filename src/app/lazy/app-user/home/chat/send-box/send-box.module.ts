import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FmpSendBoxComponent} from './send-box.component';
import {FmpSymbolsCounterComponent} from './symbols-counter/symbols-counter.component';
import {FmpFileSelectorComponent} from './file-selector/file-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FmpSendBoxComponent,
    FmpSymbolsCounterComponent,
    FmpFileSelectorComponent
  ],
  exports: [
    FmpSendBoxComponent
  ]
})
export class FmpSendBoxModule {}
