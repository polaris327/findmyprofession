import {Component, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'fmp-alert-modal-component',
  templateUrl: 'alert-modal.html',
  styles: [require('./alert-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class AlertModalComponent {

  public message: string = '';
  public title: string = 'Warning';
  public showButtons: boolean = true;
  public type: string = 'common';

  public defaultMessage: string = 'Warning alert modal';

  public confirm(): void {
    this.activeModal.close('remove close');
  }

  public cancel(): void {
    this.activeModal.dismiss('Cancel close');
  }

  constructor(public activeModal: NgbActiveModal,
              private router: Router) {
  }

  public goToLoginPage(mouseEvent: MouseEvent): void {
    mouseEvent.preventDefault();
    this.navigateToLogin();
  }

  public linkTaped(event: TouchEvent): void {
    event.preventDefault();
    this.navigateToLogin();
  }

  private navigateToLogin(): void {
    Observable.fromPromise(this.router.navigate(['/login']))
      .filter((state: boolean) => state)
      .subscribe(
        () => this.activeModal.close()
      );
  }
}