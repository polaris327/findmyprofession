import {IWorkExperienceEntity, IWorkExperienceTab} from './work-experience-item/work-experience-item.model';
import {IEducationEntity, IEducationTab} from './education-experience-item/education-experience-item.model';

export interface IWorkExperienceList {
  creating: Array<IWorkExperienceEntity>;
  existing: Array<IWorkExperienceTab>;
}

export interface IEducationExperienceList {
  creating: Array<IEducationEntity>;
  existing: Array<IEducationTab>;
}