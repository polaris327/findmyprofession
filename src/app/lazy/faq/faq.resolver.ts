import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {FAQ_PAGE_DATA} from '../../core/models/api-urls.model';
import {HttpService} from '../../core/services/http.service';
import {IHttpRequest} from '../../core/models/core.model';
import {IFaq} from './faq.model';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class FaqPageResolver implements Resolve<any> {
  constructor(private http: HttpService) {}

  /**
   * Method to get page data
   * @param route
   * @returns {Observable<any>}
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<IFaq.IFaqPage> {
    const request: IHttpRequest = {
      url: FAQ_PAGE_DATA
    };
    return this.http.sendRequest(request);
  }
}