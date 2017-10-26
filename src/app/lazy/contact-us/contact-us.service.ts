import {Injectable} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs/Observable';

import {CONTACT_US} from '../../core/models/api-urls.model';
import {IHttpRequest} from '../../core/models/core.model';
import {IContactUsRequest} from './contact-us.model';

@Injectable()
export class ContactUsService {
  constructor(private httpService: HttpService) {}

  public sendForm(data: IContactUsRequest): Observable<any> {
    const request: IHttpRequest = {
      method: 'Post',
      url: CONTACT_US,
      body: data
    };

    return this.httpService.sendRequest(request);
  }
}