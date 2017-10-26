import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router,} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {TransferHttp} from '../../../modules/transfer-http/transfer-http';
import {HOME_PAGE_DATA} from '../../core/models/api-urls.model';
import {HomePage} from './home.model';
import {UserAuthGuard} from '../../core/guards/user-auth.guard';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class HomePageDataResolver implements Resolve<any> {
  constructor(private http: TransferHttp,
              private authGuard: UserAuthGuard) {}

  /**
   * Method to get page data
   * @param route
   * @returns {Observable<IHomePageData>}
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<HomePage.IHomePage> {
    if (this.authGuard.canActivate()) {
      return this.http.get(TransferHttp.getUrl(HOME_PAGE_DATA, true));
    }
    return Observable.of(null);
  }
}