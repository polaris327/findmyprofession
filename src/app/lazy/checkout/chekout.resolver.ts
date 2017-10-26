import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ICareerFinderPackage} from '../career-finder-congratulation/career-finder-congratulation.model';
import {HttpService} from '../../core/services/http.service';

@Injectable()
export class CheckoutPageResolver implements Resolve<any> {
  constructor(private httpService: HttpService) {}
  /**
   * Method to get page data
   * @param route
   * @returns {Observable<Array<ICareerFinderPackage>>}
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<Array<ICareerFinderPackage>> {
    return this.httpService.sendRequest({
      url: '/congratulation'
    });
  }
}