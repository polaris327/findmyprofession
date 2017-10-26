import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {CoachingServiceEntity} from './coaching-services-holder.model';
import {COACHING_PACKAGES} from '../../core/models/api-urls.model';
import {TransferHttp} from '../../../modules/transfer-http/transfer-http';
import {FRONT_BACK_URL} from '../../../main.config';

@Injectable()
export class CoachingPackagesHolderResolver implements Resolve<Observable<CoachingServiceEntity[]>>{
  constructor(private httpService: TransferHttp) {}

  public resolve(): Observable<Observable<CoachingServiceEntity[]>> {
    return this.httpService
      .get(FRONT_BACK_URL + COACHING_PACKAGES)
      .catch(() => Observable.of(false));
  }
}