import {NgModule} from '@angular/core';
import {FaqComponent} from './faq.component';
import {FaqRoutingModule} from './faq-routing.module';
import {CommonModule} from '@angular/common';
import {FaqPageResolver} from './faq.resolver';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    FaqRoutingModule,
    CommonModule,
    NgbAccordionModule
  ],
  providers: [
    FaqPageResolver
  ],
  declarations: [
    FaqComponent
  ],
  exports: [
    FaqComponent
  ]
})
export class FaqModule {}
