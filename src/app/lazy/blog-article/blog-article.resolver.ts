import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {TransferHttp} from '../../../modules/transfer-http/transfer-http';
import {IBlogArticle} from './blog-article.model';
import {ARTICLES} from '../../core/models/api-urls.model';
import {BlogArticleComponent} from './blog-article.component';

/**
 * Service to get data before home page is loaded
 */
@Injectable()
export class BlogArticleDataResolver implements Resolve<any> {
  constructor(private http: TransferHttp,
              private router: Router) {
  }

  /**
   * Method to get page data
   * @param snapshot
   * @returns {Observable<IBlogArticle>}
   */
  public resolve(snapshot: ActivatedRouteSnapshot): Observable<IBlogArticle | null> {
    if (BlogArticleComponent.inited) {
      return Observable.of(null);
    }
    const url: string = TransferHttp.getUrl(`${ARTICLES}/${snapshot.params['title']}`, true);
    return this.http.get(url)
      .catch(() => {
        this.router.navigate(['/career-advice']);
        return Observable.of(null);
      });
  }
}