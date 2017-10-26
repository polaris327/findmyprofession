import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {MODE_DESK, MODE_MOB} from '../models/core.model';

@Injectable()
export class ResizeModeService {

  public mode$: BehaviorSubject<string>;

  constructor() {
    this.mode$ = new BehaviorSubject<string>(null);
  }

  public set windowWidth(value: number) {
    if (value < 1025) {
      this.state = MODE_MOB;
    } else {
      this.state = MODE_DESK;
    }
  }

  public isDesk(): boolean {
    return this.state === MODE_DESK;
  }

  public isMob(): boolean {
    return this.state === MODE_MOB;
  }

  public get state (): string {
    return this.mode$.getValue();
  };

  public set state (value: string) {
    if (value === MODE_MOB || value === MODE_DESK) {
      this.mode$.next(value);
    }
  }
}