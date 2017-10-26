import {NgModule} from '@angular/core';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {FmpPlansModule} from '../../../../modules/fmp-plans/fmp-plans.module';
import {PriceBoxComponent} from './price-box.component';
import {PriceBoxTabComponent} from './price-box-tab/price-box-tab.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FmpPlansModule,
    NgbTabsetModule
  ],
  declarations: [
    PriceBoxComponent,
    PriceBoxTabComponent
  ],
  exports: [
    PriceBoxComponent
  ]
})
export class PriceBoxModule {}
