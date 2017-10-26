import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {IScheduleCallsResponse} from './user-schedule.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../../core/models/core.model';
import {USER_SCHEDULE} from '../../../core/models/api-urls.model';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class UserScheduleResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}

  /**
   * Method to fetching data from server
   * @returns {Observable<Array<IScheduleEvent> | IErrorResponse>}
   */
  public resolve(): Observable<IScheduleCallsResponse | IErrorResponse> {
    const request: IHttpRequest = {
      url: USER_SCHEDULE,
      userToken: true
    };
   return this.httpService.sendRequest(request);
  }
}