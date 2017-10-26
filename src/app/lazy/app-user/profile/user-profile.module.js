var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { UserProfileHolderComponent } from './user-profile.component';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { NgbAccordionModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AccordionTitleComponent } from './accordion-title/accordion-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionTabProfileModule } from './accordion-tabs/profile/accordion-tab-profile.module';
import { ProfileContentResolver } from './user-profile.resolver';
import { UserProfileService } from './user-profile.service';
import { ProfileReferenceModule } from './accordion-tabs/references/profile-references.module';
import { CareerPreferencesModule } from './accordion-tabs/career-preferences/career-preferences.module';
import { ProfileUtilities } from './profile-utilities.service';
import { ProfileAccordionService } from './profile-accordion.service';
import { TextMaskModule } from 'angular2-text-mask';
import { AccordionTabDocumentModule } from './accordion-tabs/documents/accordion-tab-documents.module';
import { AccordionTabExperienceModule } from './accordion-tabs/exprience/accordion-tab-experience.module';
import { AccordionTabQuestionsModule } from './accordion-tabs/questions/accordion-tab-questions.module';
import { ProfileProgressComponent } from './profile-progress/profile-progress.component';
import { ErrorModule } from '../../../modules/error/error.module';
var UserProfileModule = /** @class */ (function () {
    function UserProfileModule() {
    }
    UserProfileModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                UserProfileRoutingModule,
                NgbAccordionModule,
                FormsModule,
                ReactiveFormsModule,
                ErrorModule,
                TextMaskModule,
                NgbDatepickerModule,
                AccordionTabProfileModule,
                CareerPreferencesModule,
                ProfileReferenceModule,
                CareerPreferencesModule,
                NgbDatepickerModule,
                AccordionTabExperienceModule,
                AccordionTabDocumentModule,
                AccordionTabQuestionsModule
            ],
            providers: [
                ProfileContentResolver,
                UserProfileService,
                ProfileUtilities,
                UserProfileService,
                ProfileAccordionService
            ],
            declarations: [
                UserProfileHolderComponent,
                AccordionTitleComponent,
                ProfileProgressComponent
            ],
            exports: [
                UserProfileHolderComponent
            ]
        })
    ], UserProfileModule);
    return UserProfileModule;
}());
export { UserProfileModule };
