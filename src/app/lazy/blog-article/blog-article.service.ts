import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {HttpService} from '../../core/services/http.service';
import {IHttpRequest} from '../../core/models/core.model';
import {ARTICLE_SUBSCRIBE, ARTICLES} from '../../core/models/api-urls.model';

@Injectable()
export class BlogArticleService {
  constructor(private httpService: HttpService) {}

  /**
   * Method to subscribe user to article
   * @param email
   * @returns {Observable<any>}
   */
  public subscribeToArticle(email: string): Observable<any> {
    const request: IHttpRequest = {
      method: 'POST',
      body: {email},
      url: ARTICLE_SUBSCRIBE
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to load article content
   * @param url
   * @returns {Observable<any>}
   */
  public getArticleData(url: string): Observable<any> {
    return this.httpService.sendRequest({
      url: `${ARTICLES}/${url}`
    });
  }
}