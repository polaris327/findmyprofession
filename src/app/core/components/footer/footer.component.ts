import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-footer-component',
  templateUrl: 'footer.component.html',
  styles: [require('./footer.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnDestroy {
  public isAuth: boolean = false;
  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private userService: UserService,
              private router: Router) {
    this.createAuthSub();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public openCareerAdvice(event: MouseEvent): void {
    event.preventDefault();
    this.router.navigate(['/career-advice']);
  }

  private createAuthSub(): void {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => this.isAuth = state
      );
  }
}
