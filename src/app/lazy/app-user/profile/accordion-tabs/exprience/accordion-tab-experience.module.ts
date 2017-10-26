import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkExperienceItemModule} from './work-experience-item/work-experience-item.module';
import {AccordionTabExperienceComponent} from './accordion-tab-experience.component';
import {EducationExperienceItemModule} from './education-experience-item/education-experience-item.module';

@NgModule({
  imports: [
    CommonModule,
    WorkExperienceItemModule,
    EducationExperienceItemModule
  ],
  declarations: [
    AccordionTabExperienceComponent
  ],
  exports: [
    AccordionTabExperienceComponent
  ]
})
export class AccordionTabExperienceModule {}