import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {TransferHttp} from '../../../modules/transfer-http/transfer-http'
import {TESTIMONIALS_PAGE} from '../../core/models/api-urls.model';
import {Testimonials} from './testimonials.model';

@Injectable()
export class TestimonialsPageDataResolver implements Resolve<any> {
  constructor(private http: TransferHttp) {}

  /**
   * Method to get page data
   * @returns {Observable<any>}
   */
  public resolve(snapshot: ActivatedRouteSnapshot): Observable<Testimonials.ITestimonialsPage> {
    const params: any = snapshot.queryParams;
    let page: number = 1;
    if (params && Number.isInteger(+params.page)) {
      page = params.page;
    }
    return this.http.get(TransferHttp.getUrl(TESTIMONIALS_PAGE, true), {params: {page}});
  }
}