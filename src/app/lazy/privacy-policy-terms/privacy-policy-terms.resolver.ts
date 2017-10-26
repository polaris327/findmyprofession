import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {PRIVACY_TERMS_PAGE} from '../../core/models/api-urls.model';
import {HttpService} from '../../core/services/http.service';
import {IHttpRequest} from '../../core/models/core.model';
import {PrivacyPolicyTerms} from './privacy-policy-terms.model';

@Injectable()
export class PrivacyTermsPageDataResolver implements Resolve<any> {
  constructor(private http: HttpService) {}

  /**
   * Method to get page data
   * @param route
   * @returns {Observable<PrivacyPolicyTerms.IPageContent>}
   */
  public resolve(route: ActivatedRouteSnapshot): Observable<PrivacyPolicyTerms.IPageContent> {
    const request: IHttpRequest = {
      url: PRIVACY_TERMS_PAGE
    };
    return this.http.sendRequest(request);
  }
}