import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ISignInModelRequest} from './signin.model';
import {SIGN_IN} from '../../core/models/api-urls.model';
import {IErrorResponse} from '../../core/models/core.model';
import {HttpService} from '../../core/services/http.service';
import {IUser} from '../../core/models/user.model';

@Injectable()
export class SignInService {
  constructor(private httpService: HttpService) {}

  /**
   * Method to Sign In existing User
   * @param body
   * @returns {Observable<IUser | IErrorResponse>}
   */
  public signInUser(body: ISignInModelRequest): Observable<IUser | IErrorResponse> {
    return this.httpService.sendRequest<IUser>({
      method: 'POST',
      url: SIGN_IN,
      body
    });
  }
}