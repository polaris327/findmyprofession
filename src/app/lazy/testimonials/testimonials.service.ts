import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Testimonials} from './testimonials.model';
import {HttpService} from '../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../core/models/core.model';
import {TESTIMONIALS} from '../../core/models/api-urls.model';

@Injectable()
export class TestimonialsService {
  constructor(private httpService: HttpService) {}

  public getTestimonials(options: Testimonials.ITestimonialsRequest): Observable<Testimonials.ITestimonialsPage | IErrorResponse> {
    const request: IHttpRequest = {
      url: TESTIMONIALS,
      searchParams: options
    };
    return this.httpService.sendRequest(request);
  }
}