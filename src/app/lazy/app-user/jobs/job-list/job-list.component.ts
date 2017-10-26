import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IJobEntity} from '../user-jobs.model';
import {JobItemApplyEvent} from './job-item/job-item.model';
import {JobStatusChangeEvent} from './job-list.model';

@Component({
  selector: 'fmp-jobs-list-component',
  templateUrl: 'job-list.html',
  styles: [require('./job-list.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class JobListComponent {

  @Input()
  jobs: Array<IJobEntity>;

  @Input()
  type: string;

  @Input()
  statuses: Array<string>;

  @Input()
  jobsCount: number;

  @Input()
  sortList: Array<string>;

  @Input()
  filterByOption: string;

  @Input()
  currentPage: number;

  @Input()
  isCareerFinderBought: boolean = false;

  @Output()
  onFilterOptionSelected: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onFileDownload: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onJobChanged: EventEmitter<JobStatusChangeEvent> = new EventEmitter<JobStatusChangeEvent>();

  @Output()
  onJobAdd: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onJobRemove: EventEmitter<IJobEntity> = new EventEmitter<IJobEntity>();

  @Output()
  onPageChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  onApplyStateChanged: EventEmitter<JobItemApplyEvent> = new EventEmitter<JobItemApplyEvent>();

  @Output()
  onCoverLetterUpload: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCoverLetterRemove: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onCareerFinderClicked: EventEmitter<void> = new EventEmitter<void>();

  public readonly defaultLimit: number = 7;

  public filterBy(option: string): void {
    this.onFilterOptionSelected.emit(option);
  }

  public downloadFile(file: string): void {
    this.onFileDownload.emit(file);
  }

  public itemStatusChanged(status: any, job: IJobEntity, index: number): void {
    this.onJobChanged.emit({
      status: status,
      id: job.id,
      index: index
    });
  }

  public addNewJob(): void {
    this.onJobAdd.emit();
  }

  public removeJob(job: IJobEntity): void {
    this.onJobRemove.emit(job);
  }

  public pageChanged(page: number): void {
    this.onPageChange.emit(page);
  }

  public applyStateChanged(eventObject: JobItemApplyEvent): void {
    this.onApplyStateChanged.emit(eventObject);
  }

  public uploadCoverLetter(file: File, job: IJobEntity, index: number): void {
    this.onCoverLetterUpload.emit({
      file: file,
      id: job.id,
      index: index
    });
  }

  public removeCoverLetter(job: IJobEntity, index: number): void {
    this.onCoverLetterRemove.emit({id: job.id, index: index});
  }

  public selectCareerFinder(): void {
    this.onCareerFinderClicked.emit();
  }
}