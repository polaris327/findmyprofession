import {Injectable} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs/Observable';
import {IArticlesRequest} from './career-advice.model';
import {IHttpRequest} from '../../core/models/core.model';
import {ARTICLES} from '../../core/models/api-urls.model';

@Injectable()
export class CareerAdviceService {
  constructor(private httpService: HttpService) {}

  public getArticles(params: IArticlesRequest): Observable<any> {
    let url: string = params.url;
    if (/resume-cover-letter/.test(params.url)) {
      url = 'resume';
    }
    const request: IHttpRequest = {
      url: `/blog/${url}`,
      searchParams: {page: params.page}
    };
    return this.httpService.sendRequest(request);
  }
}