import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {TransferHttp} from '../../../modules/transfer-http/transfer-http';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class CareerAdviceDataResolver implements Resolve<any> {
  constructor(private http: TransferHttp) {}

  /**
   * Method to get page data
   * @param snapshot
   * @param state
   * @returns {Observable<any>}
   */
  public resolve(snapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let page: number = 1;
    if (snapshot.queryParams && Number.isInteger(+snapshot.queryParams.paged)) {
      page = +snapshot.queryParams.paged;
    }
    let url: string = state.url;
    if (/\/resume-cover-letter/.test(url)) {
      url = '/resume';
    }
    return this.http.get(TransferHttp.getUrl(`/blog${url}` , true), {params: {page}});
  }
}