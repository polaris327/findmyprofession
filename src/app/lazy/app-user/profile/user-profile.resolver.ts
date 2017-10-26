import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {HttpService} from '../../../core/services/http.service';
import {PROFILE_DATA} from '../../../core/models/api-urls.model';
import {IHttpRequest} from '../../../core/models/core.model';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class ProfileContentResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const request: IHttpRequest = {
      url: PROFILE_DATA,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }
}