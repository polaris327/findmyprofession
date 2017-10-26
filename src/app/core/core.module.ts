import {NgModule} from '@angular/core';
import {FooterComponent} from './components/footer/footer.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './components/header/header.component';
import {MetaTags} from './services/meta-tags.service';
import {UserService} from './services/user.service';
import {SocialLinksModule} from '../modules/social-links/social-links.module';
import {BasketService} from './services/basket.service';
import {StoreService} from './services/store.service';
import {MemoryService} from './services/memory.service';
import {ShowValidationErrors} from './validators/show-validation-errors.model';
import {HttpService} from './services/http.service';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FacebookModule} from 'ngx-facebook';
import {ShareLinkService} from './services/share.service';
import {CalendlyModule} from '../modules/calendly/calendly.module';
import {PaymentService} from './services/payment.service';
import {CheckoutGuard} from './guards/checkout.guard';
import {AlertModalModule} from '../modules/alert-modal/alert-modal.module';
import {CoreUtilitiesService} from './services/core-utilities.service';
import {TemplatePreviewModalModule} from '../lazy/app-user/profile/accordion-tabs/documents/template-preview-modal/template-preview-modal.module';
import {JobAddModule} from '../lazy/app-user/jobs/job-add-modal/job-add-modal.module';
import {SuccessModalModule} from '../modules/success-modal/success-modal.module';
import {UserAuthGuard} from './guards/user-auth.guard';
import {AuthenticationGuard} from './guards/authentication.guard';
import {UserFavoriteArticlesService} from '../lazy/app-user/favorite-articles/user-favourite-articles.service';
import {PlatformCheckService} from './services/platform-check.service';
import {ResizeModeService} from './services/resize-mode.service';
import {ModalCreatorService} from './services/modals-creator.service';
import {CareerFinderStepsModalModule} from '../modules/career-finder-steps-modal/career-finder-steps-modal.module';
import {CustomLinkModule} from '../modules/custom-link/custom-link.module';
import {TestimonialModalModule} from '../modules/testimonial-modal/testimonial-modal.module';
import {LinkService} from './services/link-selector.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SocialLinksModule,
    NgbModule.forRoot(),
    RouterModule,
    FacebookModule.forRoot(),
    CalendlyModule,
    AlertModalModule,
    TemplatePreviewModalModule,
    NgbDropdownModule,
    JobAddModule,
    TemplatePreviewModalModule,
    SuccessModalModule,
    CareerFinderStepsModalModule,
    CustomLinkModule,
    TestimonialModalModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent
  ],
  providers: [
    StoreService,
    MemoryService,
    MetaTags,
    UserService,
    HttpService,
    BasketService,
    ShowValidationErrors,
    ShareLinkService,
    PaymentService,
    CheckoutGuard,
    AuthenticationGuard,
    UserAuthGuard,
    CoreUtilitiesService,
    UserFavoriteArticlesService,
    PlatformCheckService,
    ResizeModeService,
    ModalCreatorService,
    LinkService
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule {}
