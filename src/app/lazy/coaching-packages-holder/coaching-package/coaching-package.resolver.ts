import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TransferHttp} from '../../../../modules/transfer-http/transfer-http';
import {COACHING_PACKAGES} from '../../../core/models/api-urls.model';

@Injectable()
export class CoachingPackageResolver implements Resolve<any> {
  constructor(private httpService: TransferHttp) {}

  public resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> {
    const url: string = TransferHttp.getUrl(`${COACHING_PACKAGES}${state.url}`, true);
    return this.httpService.get(url);
  }
}