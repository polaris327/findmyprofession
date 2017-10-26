import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {UserJobsService} from './user-jobs.service';
import {ServicePriceResponse} from '../../../core/models/core.model';

@Injectable()
export class UserJobsResolver implements Resolve<Observable<ServicePriceResponse>>{
  constructor(private jobsService: UserJobsService) {}

  public resolve(): Observable<ServicePriceResponse> {
    return this.jobsService.getCareerFinderPrice();
  }
}