import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {IJobResponse} from './user-jobs.model';
import {IJobAddEntity} from './job-add-modal/job-add-modal.model';
import {HttpService} from '../../../core/services/http.service';
import {IErrorResponse, IHttpRequest, ServicePriceResponse} from '../../../core/models/core.model';
import {DOMAIN_URL} from '../../../../main.config';

@Injectable()
export class UserJobsService {
  constructor(private httpService: HttpService) {}

  public getJobs(type: string, page: number, filter?: string): Observable<IJobResponse> {
    const request: IHttpRequest = {
      url: `/job/${type}`,
      userToken: true,
      searchParams: {
        filter: filter || null,
        page: page
      }
    };
    return this.httpService.sendRequest(request);
  }

  public setJobStatus(id: number, status: string, page: number, option?: string): Observable<any> {
    const request: IHttpRequest = {
      method: 'PUT',
      url: `/job-status/${id}`,
      body: {status},
      searchParams: {
        page: page,
        filter: option
      },
      userToken: true,
    };
    return this.httpService.sendRequest(request);
  }

  public downloadFile(link: string): Observable<any> {
    const request: IHttpRequest = {
      url: `${DOMAIN_URL}${link}`,
      userToken: true,
      absolutePath: true,
      isBlob: true
    };
    return this.httpService.sendRequest(request);
  }

  public addJob(job: IJobAddEntity): Observable<any> {
    const request: IHttpRequest = {
      method: 'POST',
      url: '/job',
      body: job,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  public removeJob(jobId: number, page: number = 1): Observable<any> {
    const request: IHttpRequest = {
      method: 'DELETE',
      url: `/job/${jobId}`,
      searchParams: {
        page: page || null
      },
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  public changeApplyStatus(id: number, checked: boolean,page: number): Observable<any> {
    const request: IHttpRequest = {
      method: 'PUT',
      url: `/job/${id}`,
      body: {checked},
      searchParams: {
        page: page || null
      },
      userToken: true,
    };
    return this.httpService.sendRequest(request);
  }

  public uploadCoverLetter(file: File, jobId: number): Observable<any | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: `/job/cover/${jobId}`,
      body: {file},
      encoding: 'fd',
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  public removeCoverLetter( jobId: number): Observable<any | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'DELETE',
      url: `/job/cover/${jobId}`,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to get Career Finder price
   * @returns {Observable<ServicePriceResponse>}
   */
  public getCareerFinderPrice(): Observable<ServicePriceResponse> {
    const request: IHttpRequest = {
      url: `/price-services/1`,
      userToken: true
    };
    return this.httpService.sendRequest<any>(request)
      .catch(() => Observable.of({price_senior: 1}));
  }
}