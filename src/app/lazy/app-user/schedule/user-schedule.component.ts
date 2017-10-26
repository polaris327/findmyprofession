import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {
  CANCEL_STATUS, COMPLETED_STATUS, IScheduleCallService, IScheduleCallsResponse, IScheduleEvent
} from './user-schedule.model';
import {UserScheduleService} from './user-schedule.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CalendlyComponent} from '../../../modules/calendly/calendly.component';
import {IErrorResponse} from '../../../core/models/core.model';
import {AlertModalComponent} from '../../../modules/alert-modal/alert-modal.component';
import {UserService} from '../../../core/services/user.service';
import {IUser, IUserPackage} from '../../../core/models/user.model';
import {MetaTags} from '../../../core/services/meta-tags.service';

@Component({
  selector: 'fmp-my-schedule-component',
  templateUrl: 'user-schedule.html',
  styles: [require('./user-schedule.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class UserScheduleComponent {

  public calls: IScheduleCallsResponse;
  public errorMessage: string;

  private userPackagesMap: Map<number, IUserPackage>;
  private linksMap: any = {
    'resume-makeover': {
      'executive': 'resume-makeover-executive',
      'senior': 'resume-makeover-senior'
    },
    'cover-letter-service': {
      'executive': 'cover-letter-writing-executive',
      'senior': 'cover-letter-writing-senior'
    },
    'linkedin-profile-makeover': {
      'executive': 'linkedin-profile-makeover-executive',
      'senior': 'linkedin-profile-makeover-senior'
    },
    'job-interview-prep': {
      'executive': 'interview-training-executive',
      'senior': 'interview-training-senior'
    },
    'career-finder': {
      'plan': 'career-finder-intro-1'
    }
  };

  constructor(private route: ActivatedRoute,
              private scheduleService: UserScheduleService,
              private modalService: NgbModal,
              private metaService: MetaTags,
              private userService: UserService) {

    this.metaService.setTitle('My Schedule - Find My Profession');
    this.metaService.removeAllMetaTags();

    const calls: IScheduleCallsResponse | null = route.snapshot.data['content'];
    this.setCalls(calls);
  }

  /**
   * Method to Cancel call
   * @param event
   * @param type
   * @param index
   */
  public cancelEvent(event: IScheduleEvent, type: string, index: number): void {
    if (event && event.id) {
      this.openModal(`Are you sure you want to cancel ${event.link} event?`,
        this.cancelEventRequest.bind(this, {
          id: event.id,
          index: index,
          type: type
        }));
    }
  }

  /**
   * Method to Complete call
   * @param event
   * @param type
   * @param index
   */
  public completeEvent(event: IScheduleEvent, type: string, index: number): void {
    if (event && event.id) {
      this.openModal(`Are you sure you want to mark ${event.link} complete?`,
        this.completeEventRequest.bind(this, {
          id: event.id,
          index: index,
          type: type
        }));
    }
  }

  /**
   * Method to open modal with selected service
   * @param event
   */
  public scheduleEventCall(event: any): void {
    const modal: NgbModalRef = this.modalService.open(CalendlyComponent);
    modal.componentInstance.type = event.calendlyLink;
    modal.result.then(
      () => this.reloadCalls(),
      () => this.reloadCalls()
    );
  }

  /**
   * Method to refresh calls
   */
  private reloadCalls(): void {
    this.scheduleService.getCalls()
      .subscribe(
        ((calls: IScheduleCallsResponse) => this.setCalls(calls))
      );
  }

  /**
   * Method to send Http request with complete event
   * @param args
   */
  private completeEventRequest(args: any): void {
    this.scheduleService.changeEventStatus(args.id, COMPLETED_STATUS)
      .subscribe(
        () => this.reloadCalls(),
        (error: IErrorResponse) => this._handleError(error)
      );
  }

  /**
   * Method to send Http request with cancel event
   * @param args
   */
  private cancelEventRequest(args: any): void {
    this.scheduleService.changeEventStatus(args.id, CANCEL_STATUS)
      .subscribe(
        () => this.reloadCalls(),
        (error: IErrorResponse) => this._handleError(error)
      );
  }

  /**
   * Method to open modal and trigger callback
   * @param message
   * @param callback
   */
  private openModal(message: string, callback: Function): void {
    const modal: NgbModalRef = this.modalService.open(AlertModalComponent, {
      backdrop: false
    });
    modal.result.then(() => {
      callback();
    }, () => {
      /*Canceled*/
    });
    modal.componentInstance.message = message;
  }

  private setCalls(calls: IScheduleCallsResponse): void {
    if (calls && Array.isArray(calls.available)) {
      const user: IUser = this.userService.user$.getValue();
      if (!this.userPackagesMap) {
        this.userPackagesMap = new Map<number, IUserPackage>();
        user.packages.forEach((element: IUserPackage) => {
          this.userPackagesMap.set(element.service.id, element);
        });
      }
      calls.available.forEach((element: IScheduleCallService) => {
        const packageItem: IUserPackage = this.userPackagesMap.get(element.id);
        if (this.linksMap[element.link]) {
          if (element.link === 'career-finder') {
            element.calendlyLink = this.linksMap[element.link].plan;
          } else {
            element.calendlyLink = this.linksMap[element.link][packageItem.plan.toLowerCase()];
            console.log('link: ', element.calendlyLink);
          }
        }
      });
    }
    this.calls = calls;
  }

  /**
   * Method to handle http error
   * @param e
   * @private
   */
  private _handleError(e: IErrorResponse): void {
    this.errorMessage = e.message;
  }
}