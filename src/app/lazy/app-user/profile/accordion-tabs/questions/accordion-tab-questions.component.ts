import {Component, Input, OnChanges, OnDestroy, ViewEncapsulation} from '@angular/core';
import {IProfileQuestions, IProfileQuestionsModel} from './accordion-tab-questions.model';
import {PROFILE_QUESTIONS} from './accordion-tab-questions-data.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserProfileService} from '../../user-profile.service';
import {IProfile} from '../../user-profile.model';
import {IErrorResponse} from '../../../../../core/models/core.model';
import {ProfileAccordionService} from '../../profile-accordion.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-profile-tab-questions',
  templateUrl: 'accordion-tab-questions.html',
  styles: [require('./accordion-tab-questions.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class AccordionTabQuestionsComponent implements OnChanges, OnDestroy {

  @Input()
  profileQuestions: IProfileQuestionsModel;

  @Input()
  accordionId: string;

  public questions: IProfileQuestions;
  public modelForm: FormGroup;
  public errorMessage: string;
  public isModelChanged: boolean = false;
  public isRequestSending: boolean = false;
  public accordionState: any;
  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private fb: FormBuilder,
              private profileService: UserProfileService,
              private accordionService: ProfileAccordionService) {
    this.questions = PROFILE_QUESTIONS;

    this.accordionSubscriptions();
  }

  public ngOnChanges(): void {
    if (this.profileQuestions) {
      this.buildForm(this.profileQuestions);
    }
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.checkForUpdate();
  }

  public saveForm(): void {
    this.profileService.updateQuestions(this.modelForm.value)
      .do(() => this.isRequestSending = true)
      .finally(() => this.isRequestSending = false)
      .subscribe(
        (response: IProfile) => {
          this.accordionService.profileUpdate$.next({
            profile: response,
            activeId: 'profile-accordion-6',
            needClose: false
          });
        },
        (error: IErrorResponse) => this.handleError(error)
      );
  }

  public setField(field: string, value: string): void {
    this.modelForm.controls[field].setValue(value);
  }

  /**
   * Method to subscribe to accordion service
   */
  private accordionSubscriptions(): void {
    this.accordionService.accordionState$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: any) => this.accordionState = state
      );
  }

  private buildForm(answers: IProfileQuestionsModel): void {
    this.modelForm = this.fb.group({
      work_authorization: [
        answers ? answers.work_authorization : null
      ],
      gender: [
        answers ? answers.gender : null
      ],
      veteran_status: [
        answers ? answers.veteran_status : null
      ],
      disability_status: [
        answers ? answers.disability_status : null
      ],
      race_ethnicity: [
        answers ? answers.race_ethnicity : null
      ]
    });

    this.modelForm.valueChanges
      .subscribe(
        () => this.isModelChanged = true
      );
  }

  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }

  private checkForUpdate(): void {
    if (this.isModelChanged) {
      this.saveForm();
    }
  }
}