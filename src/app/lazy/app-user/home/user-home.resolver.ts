import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {IUserHome} from './user-home.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse} from '../../../core/models/core.model';
import {USER_HOME_PAGE} from '../../../core/models/api-urls.model';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class UserHomeDataResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  public resolve(): Observable<Array<IUserHome> | IErrorResponse> {
    return this.httpService.sendRequest({
      url: USER_HOME_PAGE,
      userToken: true
    });
  }
}