import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {IChatMessage} from '../user-home.model';
import {HttpService} from '../../../../core/services/http.service';
import {IErrorResponse, IHttpRequest} from '../../../../core/models/core.model';
import {MESSAGES_UPDATE, SEND_MESSAGE} from '../../../../core/models/api-urls.model';
import {DOMAIN_URL} from '../../../../../main.config';

@Injectable()
export class ChatService {
  constructor(private httpService: HttpService) {}

  /**
   * Method to send message
   * @param message
   * @returns {Observable<IChatMessage | IErrorResponse>}
   */
  public sendMessage(message: IChatMessage): Observable<IChatMessage | IErrorResponse> {
    const request: IHttpRequest = {
      method: 'POST',
      url: SEND_MESSAGE,
      body: message,
      encoding: 'fd',
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to get new messages
   * @returns {Observable<any>}
   */
  public getNewMessages(): Observable<Array<IChatMessage> | IErrorResponse> {
    const request: IHttpRequest = {
      url: MESSAGES_UPDATE,
      userToken: true
    };
    return this.httpService.sendRequest(request);
  }

  /**
   * Method to
   * @param fileSrc
   * @returns {Observable<string | IErrorResponse>}
   */
  public downloadFile(fileSrc: string): Observable<string | IErrorResponse> {
    const request: IHttpRequest = {
      url: `${DOMAIN_URL}${fileSrc}`,
      userToken: true,
      absolutePath: true,
      isBlob: true
    };
    return this.httpService.sendRequest(request);
  }
}