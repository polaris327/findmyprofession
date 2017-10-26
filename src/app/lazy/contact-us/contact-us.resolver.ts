import {Injectable} from '@angular/core';
import {Resolve,} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {TransferHttp} from '../../../modules/transfer-http/transfer-http';
import {CONTACT_US_PAGE} from '../../core/models/api-urls.model';

@Injectable()
export class ContactUsPageDataResolver implements Resolve<any> {
  constructor(private http: TransferHttp) {}

  /**
   * Method to get page data
   * @returns {Observable<any>}
   */
  public resolve(): Observable<any> {
    return this.http.get(TransferHttp.getUrl(CONTACT_US_PAGE, true));
  }
}