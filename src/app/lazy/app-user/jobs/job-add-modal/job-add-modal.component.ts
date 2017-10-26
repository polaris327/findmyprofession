import {Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserJobsService} from '../user-jobs.service';
import {JobAddErrors} from './job-add-modal-errors.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ShowValidationErrors} from '../../../../core/validators/show-validation-errors.model';
import {WEBSITE_LINK} from '../../../../core/models/regex-patterns.model';

import {IJobResponse} from '../user-jobs.model';
@Component({
  selector: 'fmp-add-job-modal',
  templateUrl: 'job-add-modal.html',
  styles: [require('./job-add-modal.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FmpAddJobComponent extends ShowValidationErrors implements OnDestroy {

  public modelForm: FormGroup;

  public fm: any;
  
  private jobs: Array<String> = [];

  constructor(private fb: FormBuilder,
              public errorsFormModel: JobAddErrors,
              private modalService: NgbActiveModal,
              private jobsService: UserJobsService) {
    super();

    this.modelForm = this.fb.group({
      link: ['', [
        Validators.required,
        Validators.pattern(WEBSITE_LINK)
      ]],
      position: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      company: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      isGlobalValidate: [{
        value: false,
        disabled: true
      }]
    });
        
    this.jobsService.getJobs('liked',0)
    .subscribe(
      (response: IJobResponse) => {
        for(var i = 0 ; i < response.jobs.length; i ++) {
          this.jobs.push(response.jobs[i].link)
        }                
      }
    ); 
    
    

    super.setData(this.modelForm, this.errorsFormModel);

    this.modelForm.valueChanges
      .subscribe(() => super.onValueChanged());

    this.fm = this.errorsFormModel.formErrors;
  }

  public ngOnDestroy(): void {
    super.clearErrors();
  }

  public saveJob(): void {
    this.modelForm.get('isGlobalValidate').setValue(true);
    super.onValueChanged();

    if (this.modelForm.invalid) {
      return;
    }
    var joblink = this.modelForm.controls.link.value;
    if(this.checkDuplicateJobLink(joblink)) {
      this.fm.isExistJob = true;
      return;
    }
    this.modalService.close(this.modelForm.value);
  }

  /**
   * Method to dismiss modal
   */
  public cancel(): void {
    this.modalService.dismiss('Client close modal.');
  }

  public closeError(field: string): void {
    this.fm[field] = '';
  }

  private checkDuplicateJobLink(joblink): boolean {
    for(var i = 0; i < this.jobs.length; i ++) {
      if(this.jobs[i] == joblink) {
        return true;
      } 
    }
    return false;
  }
}