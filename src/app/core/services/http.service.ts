import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IErrorResponse, IHttpRequest} from '../models/core.model';
import {Headers, URLSearchParams, Http, Request, Response, ResponseContentType} from '@angular/http';
import {UserService} from './user.service';
import {IUser} from '../models/user.model';
import {FRONT_BACK_URL} from '../../../main.config';

/**
 * Custom http service
 */
@Injectable()
export class HttpService {

  public readonly defaultError: IErrorResponse = {
    status: 'Fail',
    message: 'Server error.'
  };
  public userToken: string;

  constructor(private http: Http,
              private userService: UserService) {

    this.userService.user$
      .subscribe(
        (user: IUser) => {
          this.userToken = user ? user.token : null;
        }
      );
  }

  public sendRequest<ResponseType>(options: IHttpRequest): Observable<ResponseType> {
    let body: any;
    switch (options.encoding) {
      case 'url':
        body = HttpService.urlEncodeBody(options.body);
        break;
      case 'fd':
        body = HttpService.formDataBody(options.body);
        break;
      default:
        body = options.body;
    }
    const request = new Request({
      method: options.method || 'GET',
      url: HttpService.getUrl(options),
      body,
      headers: HttpService.getHeaders(options.userToken ? this.userToken : null),
      params: options.searchParams ? HttpService.urlEncodeBody(options.searchParams) : null,
      responseType: this.getResponseContentType(options)
    });

    return this.processRequest<ResponseType>(request, options);
  }

  private getResponseContentType(options: IHttpRequest): ResponseContentType {
    if (options.isBlob) {
      return ResponseContentType.Blob;
    }

    if (options.isText) {
      return ResponseContentType.Text;
    }

    return ResponseContentType.Json;
  }

  public processRequest<Type>(req: Request, options: IHttpRequest): Observable<Type> {
    return this.http
      .request(req)
      .map(res => this.mapContent(res, options))
      .catch(this.errorHandler.bind(this));
  }

  private mapContent(res: Response | any, options: IHttpRequest): any {
    if (options.isBlob) {
      return res.blob();
    }
    if (options.isText) {
      return res._body.toString();
    }
    return res.json();
  }

  /**
   * Method to get Headers with user token provide
   * @returns {Headers}
   */
  public getHeadersWithToken(): Headers {
    const headers: Headers = new Headers();
    const user: IUser = this.userService.user$.getValue();
    if (user) {
      headers.set('token', this.userService.user$.getValue().token);
    }
    return headers;
  }

  public errorHandler(err) {
    if ((err instanceof Response) && HttpService.checkResType(err, 'json')) {
      let errObject: any = err.json();
      if (errObject && errObject.error) {
        errObject = errObject.error;
      }
      return Observable.throw(errObject || this.defaultError);
    }
    return Observable.throw(this.defaultError);
  }

  public static urlEncodeBody(data: any | Object): URLSearchParams {
    const params: URLSearchParams = new URLSearchParams();
    Object.keys(data)
      .forEach((key: string) => params.set(key, data[key]));
    return params;
  }

  public static formDataBody(data: any | Object): FormData {
    const fd: FormData = new FormData();
    Object.keys(data)
      .forEach((key: string) => fd.append(key, data[key]));
    return fd;
  }

  public static checkResType(res: Response, type: string = 'json'): boolean {
    const resType: string = res.headers.get('Content-Type');
    return resType && (resType.indexOf(type) !== -1);
  }

  private static getHeaders(token: string): Headers {
    const headers: Headers = new Headers();
    if (token) {
      headers.append('token' , token);
    }
    return headers;
  }

  private static getUrl(options: IHttpRequest): string {
    return options.absolutePath ? options.url : 'https://www.findmyprofession.com/api/v1' + options.url;
  }
}