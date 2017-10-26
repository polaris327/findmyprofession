import {ProfileTabMode} from '../../../user-profile.model';

export interface IEducationEntity {
  readonly id?: number;

  institution: string;
  discipline: string;
  level: string;
  start_date: string;
  end_date: string;

}

export interface IEducationTab {
  item: IEducationEntity;
  mode: ProfileTabMode;
}

