import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {TransferHttp} from '../../../modules/transfer-http/transfer-http';
import {ABOUT_PAGE_DATA} from '../../core/models/api-urls.model';
import {AboutUs} from './about.model';
import IAboutUsPage = AboutUs.IAboutUsPage;

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class AboutPageResolver implements Resolve<any> {
  constructor(private http: TransferHttp) {}

  /**
   * Method to get page data
   * @param route
   * @returns {Observable<IAboutUsPage>}
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<IAboutUsPage> {
    return this.http.get(TransferHttp.getUrl(ABOUT_PAGE_DATA, true));
  }
}