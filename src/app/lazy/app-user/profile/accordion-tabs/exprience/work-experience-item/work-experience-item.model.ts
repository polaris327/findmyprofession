import {ProfileTabMode} from '../../../user-profile.model';

export interface IWorkExperienceEntity {
  readonly id?: number;

  employer: string;
  job_title: string;
  start_date: string;
  end_date: string;
  salary_earned: number;
  reason_for_leaving: string;

}

export interface IWorkExperienceTab {
  item: IWorkExperienceEntity;
  mode: ProfileTabMode;
}

