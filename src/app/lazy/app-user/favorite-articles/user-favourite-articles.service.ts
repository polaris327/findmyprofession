import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {IFavoriteArticleResponse} from './user-favorite-articles.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../../core/models/core.model';
import {FAVORITES_ARTICLES} from '../../../core/models/api-urls.model';

@Injectable()
export class UserFavoriteArticlesService {
  constructor(private http: HttpService) {}

  public getArticles(page: number): Observable<IFavoriteArticleResponse | IErrorResponse> {
    const request: IHttpRequest = {
      url: FAVORITES_ARTICLES,
      userToken: true,
      searchParams: {page: page}
    };
    return this.http.sendRequest(request);
  }

  public likeArticle(id: number): Observable<any> {
    const request: IHttpRequest = {
      method: 'PUT',
      url: `${FAVORITES_ARTICLES}/${id}`,
      userToken: true
    };
    return this.http.sendRequest(request);
  }

  public unLikeArticle(id: number): Observable<any> {
    const request: IHttpRequest = {
      method: 'DELETE',
      url: `${FAVORITES_ARTICLES}/${id}`,
      userToken: true
    };
    return this.http.sendRequest(request);
  }

  public isArticleLiked(id: number): Observable<any> {
    const request: IHttpRequest = {
      url: `${FAVORITES_ARTICLES}/${id}`,
      userToken: true
    };
    return this.http.sendRequest(request);
  }

  /**
   * Method to check if articles liked for user
   * @param articlesIds
   * @returns {Observable<any>}
   */
  public checkIfArticlesLiked(articlesIds: Array<number>): Observable<any> {
    const request: IHttpRequest = {
      method: 'POST',
      url: `/favorites/blog-likes`,
      userToken: true,
      body: {
        blog: articlesIds
      }
    };
    return this.http.sendRequest(request);
  }
}