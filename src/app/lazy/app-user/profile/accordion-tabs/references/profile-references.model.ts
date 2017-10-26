import {IReferenceItem} from './reference-item/reference-item.model';
import {ProfileTabMode} from '../../user-profile.model';

export interface IProfileReferenceEntity {
  mode: ProfileTabMode;
  item: IReferenceItem;
}

export interface IProfileReferences {
  existing: Array<IProfileReferenceEntity>;
  creating: Array<IReferenceItem>;
}
