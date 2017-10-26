import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {ProfileUpdateEvent} from './user-profile.model';

@Injectable()
export class ProfileAccordionService {

  public accordionState$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public profileUpdate$: BehaviorSubject<ProfileUpdateEvent> = new BehaviorSubject<ProfileUpdateEvent>(null);
}