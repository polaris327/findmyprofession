import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {UserJobsService} from './user-jobs.service';
import {
  IJobEntity, IJobQueryParams, IJobResponse, IJobsCount, IJobsEntity, IJobsPage, IPipeEntity, ISortEntity,
  IStatusEntity, SORT_OPTIONS, STATUSES
} from './user-jobs.model';
import {NgbModal, NgbModalRef, NgbTabChangeEvent, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {FmpAddJobComponent} from './job-add-modal/job-add-modal.component';
import {IJobAddEntity} from './job-add-modal/job-add-modal.model';
import {AlertModalComponent} from '../../../modules/alert-modal/alert-modal.component';
import {CoreUtilitiesService} from '../../../core/services/core-utilities.service';
import {IErrorResponse, ServicePriceResponse} from '../../../core/models/core.model';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../../core/services/user.service';
import {IUser} from '../../../core/models/user.model';
import {CareerFinderStepsModalComponent} from '../../../modules/career-finder-steps-modal/career-finder-steps-modal.component';
import {JobItemApplyEvent} from './job-list/job-item/job-item.model';
import {JobStatusChangeEvent} from './job-list/job-list.model';
import {Title} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-user-jobs-layout',
  templateUrl: 'user-jobs.html'
})
export class UserJobsComponent implements OnInit, OnDestroy {

  @ViewChild('jobsTabSet')
  jobsTabSet: NgbTabset;

  public jobs: IJobsEntity = {
    liked: [],
    applied: []
  };

  public jobsCount: IJobsCount = {
    liked: 0,
    applied: 0
  };

  public jobsCurrentPage: IJobsPage = {
    liked: 0,
    applied: 0
  };

  public filterOption: any = {
    liked: null,
    applied: null
  };

  public statuses: IStatusEntity = {
    liked: [],
    applied: []
  };

  public sortList: ISortEntity;
  public likedSortList: Array<string> = [];
  public appliedSortList: Array<string> = [];
  public errorMessage: string;
  public user: IUser;
  public careerFinderPrice: number;

  private readonly likedStatus: string = 'liked';
  private readonly appliedStatus: string = 'applied';
  private readonly defaultCategory: string = this.likedStatus;
  private readonly defaultPage: number = 1;

  private destroyed$: Subject<any> = new Subject<any>();
  /**
   * Represent if current user bought Career Finder package
   * @type {boolean}
   */
  private isCareerFinderBought: boolean = false;

  constructor(private jobsService: UserJobsService,
              private route: ActivatedRoute,
              private router: Router,
              private changeDetector: ChangeDetectorRef,
              private modalService: NgbModal,
              private userService: UserService,
              private titleService: Title) {

    this.titleService.setTitle('My Jobs - Find My Profession');

    const price: ServicePriceResponse = this.route.snapshot.data['price'];
    if (price) {
      this.careerFinderPrice = price.price_senior;
    }

    this.statuses = STATUSES;

    this.sortList = SORT_OPTIONS;

    this.likedSortList = this.sortList.liked.map((element: IPipeEntity) => element.title);
    this.appliedSortList = this.sortList.applied.map((element: IPipeEntity) => element.title);

    this.subscribeToUser();
  }

  ngOnInit(): void {
    this.watchForQueryParams();
  }
  
  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.changeDetector.detach();
  }

  /**
   * Method to change status of the job
   * @param entity
   * @param category
   */
  public jobStatusChanged(entity: JobStatusChangeEvent, category: string): void {
    if (entity.status.currentValue === 'Ready' && !this.isCareerFinderBought) {
      this.openCareerFinderModal();
      /**
       * Reverting changes to previjob-ous
       * @type {string}
       */
      (<IJobEntity>this.jobs[category][entity.index]).status = entity.status.previousValue;
      entity.status.callback();
    } else if (entity.status.currentValue === 'Not Interested' && (<IJobEntity>this.jobs[category][entity.index]).added_by === 'user') {
      /**
       * Reverting changes to previjob-ous
       * @type {string}
       */
      (<IJobEntity>this.jobs[category][entity.index]).status = entity.status.previousValue;
      entity.status.callback();
    } else {
      const currentPage: number = this.getCurrentPage(this.getQueryParams());
      this.jobsService.setJobStatus(entity.id, entity.status.currentValue, currentPage)
        .subscribe(
          (response: IJobResponse) => this.setLoadedJobs(response, category, currentPage),
          this.handleError.bind(this)
        );
    }
  }

  /**
   * Open modal to add new job
   */
  public createNewJob(): void {
    const modal: NgbModalRef = this.modalService.open(FmpAddJobComponent);
    Observable.fromPromise(modal.result)
      .flatMap((job: IJobAddEntity) => this.jobsService.addJob(job))
      .subscribe(
        (response: IJobResponse) => this.setLoadedJobs(response, this.likedStatus),
        this.handleError.bind(this)
      );
  }

  /**
   * Remove job from list with confirmation
   * @param job
   */
  public removeJobEntity(job: IJobEntity): void {
    const modal: NgbModalRef = this.modalService.open(AlertModalComponent);

    modal.componentInstance.message = `Are you sure you want to remove the job (${job.position})?`;

    Observable.fromPromise(modal.result)
      .flatMap(() => this.jobsService.removeJob(job.id))
      .subscribe(
        (response: IJobResponse) => this.setLoadedJobs(response, this.getQueryParams().category),
        this.handleError.bind(this)
      );
  }

  /**
   * Method that triggers when user change tab
   * @param event
   */
  public onTabChanged(event: NgbTabChangeEvent): void {
    if (this.getCategory(<IJobQueryParams>this.route.snapshot.queryParams) !== event.nextId) {
      this.setQueryParams(event.nextId, 1);
    }
  }

  public onFilterOptionChanged(list: string, option: string): void {
    this.setQueryParams(list, 1, this.getSortPipeOption(list, option, 'value'));
  }

  /**
   * Method to download file from job
   * @param event
   */
  public downloadFile(event: any): void {
    this.jobsService.downloadFile(event.link)
      .subscribe(
        (data: any) => CoreUtilitiesService.saveFile(data, event.fileName),
        this.handleError.bind(this)
      );
  }

  /**
   * Method that triggers when user change page
   * @param page
   */
  public currentPageChanged(page: number): void {
    const queryParams: any = this.getQueryParams();
    this.setQueryParams(queryParams.category, page, queryParams.filter);
  }

  /**
   * Method to apply job (checkbox)
   * @param eventObject
   */
  public applyStatusChanged(eventObject: JobItemApplyEvent): void {
    if (this.isCareerFinderBought) {
      const params: IJobQueryParams = this.getQueryParams();
      const page: number = this.getCurrentPage(params);
      const category: string = this.getCategory(params);

      this.jobsService.changeApplyStatus(eventObject.id, eventObject.state, page)
        .subscribe(
          (response: IJobResponse) => this.setLoadedJobs(response, category, page),
          (error: IErrorResponse) => this.applyStatusCatch(eventObject)
        );
    } else {
      this.applyStatusCatch(eventObject);
    }
  }

  /**
   * Method to revert changes in checkbox
   * @param eventObject
   */
  private applyStatusCatch(eventObject: JobItemApplyEvent): void {
    eventObject.event.preventDefault();
    const inputElement: HTMLInputElement = (<HTMLInputElement>eventObject.event.target);
    if (inputElement) {
      inputElement.checked = !eventObject.state;
    }
    eventObject.item.checked = !eventObject.state;
    this.openCareerFinderModal();
  }

  public uploadCoverLetter(event: any, type: string): void {
    this.jobsService.uploadCoverLetter(event.file, event.id)
      .subscribe(
        (responseEntity: IJobEntity) => this.jobs[type][event.index] = responseEntity
      );
  }

  public removeCoverLetter(event: any, type: string): void {
    const modal: NgbModalRef = this.modalService.open(AlertModalComponent);
    modal.componentInstance.message = `Are you sure remove cover letter for selected job?`;

    Observable.fromPromise(modal.result)
      .filter(() => !!this.jobs[type][event.index])
      .flatMap(() => this.jobsService.removeCoverLetter(event.id))
      .subscribe(
        () => this.removeCoverLetterHandler(event, type)
      );
  }

  public openCareerFinderModal(isFull: boolean = true): void {
    const modalRef: NgbModalRef = this.modalService.open(CareerFinderStepsModalComponent, {
      size: 'lg'
    });

    modalRef.componentInstance.price = this.careerFinderPrice;
    if (!isFull) {
      modalRef.componentInstance.step = 1;
    }
  }

  private removeCoverLetterHandler(event: any, type: string): void {
    const entity: IJobEntity = this.jobs[type][event.index];
    entity.attachment_name = null;
    entity.attachment = null;
  }

  /**
   * Method to load new jobs
   * @param type
   * @param page
   * @param option
   */
  private loadJobs(type: string = this.defaultCategory, page: number = this.defaultPage, option?: string): void {
    if (option) {
      option = this.getSortPipeOption(type, option, 'title');
    }
    this.jobsService.getJobs(type, page, option)
      .subscribe(
        (response: IJobResponse) => this.setLoadedJobs(response, type, page, option),
        this.handleError.bind(this)
      );
  }

  /**
   * Method to set list of jobs
   * @param response
   * @param type
   * @param currentPage
   */
  private setLoadedJobs(response: IJobResponse, type?: string, currentPage: number = this.defaultPage, option?: string): void {
    this.jobs[type || this.defaultCategory] = response.jobs;
    this.jobsCount[type || this.defaultCategory] = response.count || 0;
    this.jobsCurrentPage[type || this.defaultCategory] = currentPage;
    this.filterOption[type || this.defaultCategory] = option;
    this.changeDetector.detectChanges();
  }

  /**
   * Method to get current page from params
   * @param params
   * @returns {number}
   */
  private getCurrentPage(params: IJobQueryParams): number {
    let page: number | string = params.page;
    if (!Number.isNaN(+page)) {
      return +page;
    }
    return 1;
  }

  /**
   * Method to get current category from params
   * @param params
   * @returns {string}
   */
  private getCategory(params: IJobQueryParams): string {
    const category: string = params.category;
    if (!category) {
      return this.defaultCategory;
    }

    if (category !== this.defaultCategory && category !== this.appliedStatus) {
      return this.defaultCategory;
    }
    return category;
  }

  /**
   * Method to navigate with query params
   * @param category
   * @param page
   * @param filter
   */
  private setQueryParams(category: string, page: number, filter?: string): void {
    this.router.navigate(['/my-jobs'],
      {
        queryParams: {
          category: category,
          page: page || 1,
          filter: filter
        }
      });
  }

  /**
   * Method watch for query params
   */
  private watchForQueryParams(): void {
    this.route.queryParams
      .do((params: IJobQueryParams) => {
        if (!params.category || !params.page) {
          this.setQueryParams(this.getCategory(params) , this.getCurrentPage(params));
        }
      })
      .filter((params: IJobQueryParams) => !!params.category && !!params.page)
      .subscribe(
        (params: IJobQueryParams) => this.queryParamsChanged(params)
      );
  }

  /**
   * method that triggers when query params changed
   * @param params
   */
  private queryParamsChanged(params: IJobQueryParams): void {
    this.changeDetector.detectChanges();
    this.jobsTabSet.select(params.category);
    this.loadJobs(params.category, this.getCurrentPage(params), params.filter);
  }

  /**
   * method to parse sort option with pipe
   * @param type
   * @param option
   * @param field
   * @returns {any}
   */
  private getSortPipeOption(type: string, option: string, field: string): string | null {
    let searchField: string = 'value';
    if (field === searchField) {
      searchField = 'title';
    }
    const pipe: IPipeEntity = this.sortList[type].filter((element: IPipeEntity) => element[searchField] === option)[0];
    if (pipe) {
     return pipe[field];
    }
    return null;
  }

  /**
   * Method to get page query params object
   * @returns {IJobQueryParams}
   */
  private getQueryParams(): IJobQueryParams {
    return <IJobQueryParams>this.route.snapshot.queryParams;
  }

  /**
   * Method to subscribe to user stream
   */
  private subscribeToUser(): void {
    this.userService.user$
      .takeUntil(this.destroyed$)
      .filter((user: IUser) => !!user)
      .subscribe(
        (user: IUser) => {
          this.user = user;
          this.isCareerFinderBought = this.userService.checkIfCareerFinderBought();
        }
      );
  }

  /**
   * Method to handle server error
   * @param error
   */
  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }
}