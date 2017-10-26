import {Injectable} from '@angular/core';
import {HttpService} from '../../core/services/http.service';
import {Observable} from 'rxjs/Observable';
import {IHttpRequest} from '../../core/models/core.model';
import {RESET_PASS, RESET_PASS_EMAIL} from '../../core/models/api-urls.model';
import {IResetPasswordRequest} from './password-reset.model';

@Injectable()
export class PasswordResetService {

  constructor(private httpService: HttpService) {}

  /**
   * Method to send email to reset password
   * @param email
   * @returns {Observable<any>|null}
   */
  public sendEmail(email: string): Observable<any> {
    const request: IHttpRequest = {
      method: 'Post',
      url: RESET_PASS_EMAIL,
      body: {email}
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to set new password
   * @param body
   * @returns {Observable<any>|null}
   */
  public resetPassword(body: IResetPasswordRequest): Observable<any> {
    const request: IHttpRequest = {
      method: 'Post',
      url: RESET_PASS,
      body: body
    };
    return this.httpService.sendRequest(request);
  }
}