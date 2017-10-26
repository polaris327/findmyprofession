import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {IUser, IUserPackage} from '../models/user.model';
import {StoreService} from './store.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  /**
   * Root User stream
   */
  public user$: BehaviorSubject<IUser>;

  /**
   * Stream of auth state of user
   */
  public isAuth$: BehaviorSubject<boolean>;

  /**
   * Store user token
   * @type {string}
   * @private
   */
  public readonly _user_key: string = '__user';

  constructor(private storeService: StoreService,
              private router: Router) {
    /**
     * Getting user from store is exist
     * @type {IUser|null}
     */
    const user: IUser | null = this.getUser();
    this.user$ = new BehaviorSubject<IUser>(user);
    this.isAuth$ = new BehaviorSubject<boolean>(!!user);
  }

  /**
   * *************************************** Public methods ******************************************
   */

  /**
   * Method to log out user from service
   */
  public logOut(): void {
    this.isAuth$.next(false);
    this.user$.next(null);
    this.clearUserInfo();
    this.router.navigate(['/']);
  }

  /**
   * Method to login user to system
   * @param user
   * @param isRemember
   */
  public signIn(user: IUser , isRemember: boolean): void {

    if (user) {
      this.isAuth$.next(true);
      this.saveUser(user , isRemember);
    }

  }

  /**
   * Method to Sign Up User
   * @param user
   * @param isRemember
   */
  public signUpUser(user: IUser , isRemember?: boolean): void {

    if (user) {
      this.isAuth$.next(true);
      this.saveUser(user , isRemember)
    }

  }

  public checkIfCareerFinderBought(): boolean {
    const user: IUser = this.user$.getValue();
    if (user) {
      return user.packages
        .filter((userPackage: IUserPackage) => !!userPackage.service)
        .some((userPackage: IUserPackage) => userPackage.service.id === 1);
    }
    return false;
  }

  /**
   * ********************************* Private methods ********************************************
   */

  /**
   * Method to update User in store
   * @param user
   * @param isRemember
   */
  private saveUser(user: IUser, isRemember?: boolean): void {
    if (user) {
      this.user$.next(user);
      this.storeService.setItem(this._user_key, user, isRemember);
    }
  }

  /**
   * Method to remove user from our store
   */
  private clearUserInfo(): void {
    this.storeService.removeItem(this._user_key);
  }

  private getUser(): IUser | null {
    return this.storeService.getItem(this._user_key) || null;
  }
}
