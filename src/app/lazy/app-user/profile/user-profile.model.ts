import {IProfileModel} from './accordion-tabs/profile/accordion-tab-profile.model';
import {ICareerPreferencesForm} from './accordion-tabs/career-preferences/career-preferences.model';
import {IWorkExperienceEntity} from './accordion-tabs/exprience/work-experience-item/work-experience-item.model';
import {IEducationEntity} from './accordion-tabs/exprience/education-experience-item/education-experience-item.model';
import {IDocumentTemplate} from './accordion-tabs/documents/document-templates/document-template.model';
import {IProfileQuestionsModel} from './accordion-tabs/questions/accordion-tab-questions.model';
import {IProfileProgress} from './profile-progress/profile-progress.model';
import {IReferenceItem} from './accordion-tabs/references/reference-item/reference-item.model';

export interface IUserProfileAccordion {
  readonly id: number;
  readonly title: string;
  readonly image_src: string;
}

export interface IProfile extends IProfileModel {
  profile?: IProfileModel;
  career_preferences: ICareerPreferencesForm;

  work_experience: Array<IWorkExperienceEntity>;

  education: Array<IEducationEntity>;

  questions: IProfileQuestionsModel;

  templates: Array<IDocumentTemplate>;

  progress: IProfileProgress;

  user_reference: Array<IReferenceItem>;
}

export enum ProfileTabMode {
  CREATE, /*Describe when user creates new reference*/
  VIEW, /*Describe when user has reference and look at it*/
  EDIT /*Describe when user has reference and edit it*/
}

export const AccordionData: Array<IUserProfileAccordion> = [
  {
    id: 1,
    title: 'Profile',
    image_src: 'profile-card'
  },
  {
    id: 2,
    title: 'Career Preferences ',
    image_src: 'profile-career-preferences'
  },
  {
    id: 3,
    title: 'Education & Work Experience',
    image_src: 'profile-education-work'
  },
  {
    id: 4,
    title: 'References',
    image_src: 'profile-references'
  },{
    id: 5,
    title: 'Documents',
    image_src: 'profile-documents'
  },
  {
    id: 6,
    title: 'EEOC Questions',
    image_src: 'profile-eeoc'
  }
];

export interface ProfileUpdateEvent {
  profile: IProfile;
  activeId?: string;
  needClose?: boolean;
}