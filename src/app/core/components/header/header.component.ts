import {Component, Input, OnChanges, OnDestroy, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {IUser} from '../../models/user.model';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
require('../../../../assets/images/logo-blue.png');

@Component({
  selector: 'fmp-header-component',
  templateUrl: 'header.component.html',
  styles: [require('./styles/header.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnDestroy, OnChanges {

  @Input()
  isAppLoading: boolean = true;

  @Input()
  isScrolled: boolean = false;

  @Input()
  scrolledStop: boolean = false;

  @Input()
  isHomeUrl: boolean;

  public isHome: boolean = false;
  public transition: boolean = false;

  public isUserAuth: boolean;
  public user: IUser;
  public menuState: boolean = false;
  public dropdownState: boolean = false;

  public isHeaderAlive: boolean = true;
  public isSearch: boolean = false;
  private destroyed$: Subject<any> = new Subject<any>();
  
  private searchStr: string = '';

  public ngOnChanges() {
    this.menuState = false;
  }

  public toggleMenu(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.menuState = !this.menuState;
  }

  public closeMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuState = false;
  }

  public openDropDown(openDropDown: NgbDropdown): void {
    if (openDropDown) {
      openDropDown.open();
    }
  }

  public closeDropDown(openDropDown: NgbDropdown): void {
    if (openDropDown) {
      openDropDown.close();
    }
  }

  public toggleDropdown(): void {
    this.dropdownState = !this.dropdownState;
  }

  constructor(private router: Router,
              private userService: UserService) {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => this.isUserAuth = state
      );

    this.userService.user$
      .takeUntil(this.destroyed$)
      .subscribe(
        (user: IUser) => this.user = user
      );

    this.router.events
      .takeUntil(this.destroyed$)
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(
        (event: NavigationEnd) => this.isHome = event.urlAfterRedirects === '/'
      );
  }

  public logOut(): void {
    this.userService.logOut();
  }

  public openHome(): void {
    this.menuState = false;
    if (this.isUserAuth) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/']);
    }
  }

  public searchBar(): void {
    this.isSearch = !this.isSearch;
  }
  public searchBlog(): void {
    this.router.navigate(['/career-advice'], { queryParams: { searchStr:  this.searchStr}});
  }
  /**
   * There are page where no header (Checkout page)
   */
  public ngOnDestroy(): void {
    this.isHeaderAlive = false;
    this.destroyed$.next();
    this.destroyed$.complete();
  }


}
