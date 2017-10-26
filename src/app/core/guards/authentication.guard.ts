import {CanActivate, CanLoad, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {UserService} from '../services/user.service';
import {PlatformCheckService} from '../services/platform-check.service';

@Injectable()
export class AuthenticationGuard implements CanLoad, CanActivate {

  constructor(private router: Router,
              private userService: UserService,
              private platformCheck: PlatformCheckService) {}

  public canLoad(): Observable<boolean> {
    return this.check();
  }

  public canActivate(): Observable<boolean> {
    return this.check();
  }

  private check(): Observable<boolean> {
    if (this.platformCheck.isBrowser) {
      const isAuth: boolean = this.userService.isAuth$.getValue();
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
      return Observable.of(isAuth);
    }
    return Observable.of(false);
  }
}