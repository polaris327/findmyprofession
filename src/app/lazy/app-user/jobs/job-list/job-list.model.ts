import {CustomChanges} from '../../../../core/models/core.model';

export interface JobStatusChangeEvent {
  status: CustomChanges<string>;
  id: number;
  index: number;
}