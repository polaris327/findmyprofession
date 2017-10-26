import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {IScheduleCallsResponse} from './user-schedule.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../../core/models/core.model';
import {USER_SCHEDULE} from '../../../core/models/api-urls.model';

@Injectable()
export class UserScheduleService {

  constructor(private http: HttpService) {}

  /**
   * Change Call status
   * @param eventId
   * @param status
   * @returns {Observable<any>}
   */
  public changeEventStatus(eventId: number, status: string): Observable<any | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      body: {
        id: eventId,
        status: status
      },
      url: USER_SCHEDULE,
      userToken: true
    };
    return this.http.sendRequest(request);
  }

  /**
   * Get list of Calls
   * @returns {Observable<IScheduleCallsResponse>}
   */
  public getCalls(): Observable<IScheduleCallsResponse> {
    const request: IHttpRequest = {
      url: USER_SCHEDULE,
      userToken: true
    };
    return this.http.sendRequest(request);
  }
}