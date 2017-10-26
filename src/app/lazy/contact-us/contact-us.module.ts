import {NgModule} from '@angular/core';
import {ContactUsRoutingModule} from './contact-us-routing.module';
import {CommonModule} from '@angular/common';

import {ContactUsComponent} from './contact-us.component';
import {ContactUsPageDataResolver} from './contact-us.resolver';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocialLinksModule} from '../../modules/social-links/social-links.module';
import {ContactUsService} from './contact-us.service';
import {ContactUsErrors} from './contact-us.model';
import {ErrorModule} from '../../modules/error/error.module';

@NgModule({
  imports: [
    ContactUsRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLinksModule,
    ErrorModule
  ],
  providers: [
    ContactUsPageDataResolver,
    ContactUsService,
    ContactUsErrors
  ],
  declarations: [
    ContactUsComponent
  ],
  exports: [
    ContactUsComponent
  ]
})
export class ContactUsModule {}
