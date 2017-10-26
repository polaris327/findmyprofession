import {NgModule} from '@angular/core';
import {CareerFinderCongratulationRoutingModule} from './career-finder-congratulation-routing.module';
import {CommonModule} from '@angular/common';
import {CareerFinderCongratulationComponent} from './career-finder-congratulation.component';
import {CustomRangeModule} from '../../modules/custom-range/cusom-range.module';
import {PackageSelectorComponent} from './package-selector/package-selector.component';
import {FormsModule} from '@angular/forms';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {CongratulationCareerFinderResolver} from './career-finder-congratulation.resolver';
import {CustomDropdownModule} from "../../modules/custom-dropdown/custom-dropdown.module";

@NgModule({
  imports: [
    CareerFinderCongratulationRoutingModule,
    CommonModule,
    CustomRangeModule,
    FormsModule,
    NgbDropdownModule,
      CustomDropdownModule
  ],
  providers: [
    CongratulationCareerFinderResolver
  ],
  declarations: [
    CareerFinderCongratulationComponent,
    PackageSelectorComponent
  ],
  exports: [
    CareerFinderCongratulationComponent
  ]
})
export class CareerFinderCongratulationModule {}