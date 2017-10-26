import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {IHomeSlideArticle} from './user-home.model';
import {HttpService} from '../../../core/services/http.service';
import {IHttpRequest} from '../../../core/models/core.model';
import {USER_HOME_PAGE} from '../../../core/models/api-urls.model';

@Injectable()
export class UserHomeService {

  constructor(private httpService: HttpService) {}

  /**
   * Method to load articles by category
   * @param category
   * @returns {Observable<any>}
   */
  public getSlides(category: string): Observable<Array<IHomeSlideArticle>> {
    const request: IHttpRequest = {
      url: `${USER_HOME_PAGE}/${category}`,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }
}