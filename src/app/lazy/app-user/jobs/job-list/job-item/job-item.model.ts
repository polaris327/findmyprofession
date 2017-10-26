import {IJobEntity} from '../../user-jobs.model';

export interface JobItemApplyEvent {
  readonly id: number;
  state: boolean;
  event: MouseEvent;
  item: IJobEntity;
}