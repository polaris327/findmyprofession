import {
  ChangeDetectorRef,
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

import {IWorkExperienceEntity} from './work-experience-item.model';
import {ProfileTabMode} from '../../../user-profile.model';
import {ProfileUtilities} from '../../../profile-utilities.service';
import {NgbDateStruct, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertModalComponent} from '../../../../../../modules/alert-modal/alert-modal.component';
import {PlatformCheckService} from '../../../../../../core/services/platform-check.service';

@Component({
  selector: 'fmp-work-experience-item',
  templateUrl: 'work-experience-item.html',
  styles: [require('./work-experience-item.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class WorkExperienceItemComponent implements OnChanges, OnInit, OnDestroy {

  @ViewChild('startDatePicker')
  startDatePicker: any;

  @ViewChild('endDatePicker')
  endDatePicker: any;

  @Input()
  mode: ProfileTabMode;

  @Input()
  item: IWorkExperienceEntity;

  @Input()
  serverError: string;

  @Output()
  onItemCreate: EventEmitter<IWorkExperienceEntity> = new EventEmitter<IWorkExperienceEntity>();

  @Output()
  onItemEditStart: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onItemUpdate: EventEmitter<IWorkExperienceEntity> = new EventEmitter<IWorkExperienceEntity>();

  @Output()
  onItemRemove: EventEmitter<number> = new EventEmitter<number>();

  public modelForm: FormGroup;
  private readonly presentTime: string = 'Present';
  public errorMessage: string | null;

  public birthDateYearsRange: string;
  public componentInited: boolean = false;
  public endDatePlaceholder: string | null = null;
  public defaultDate: Date;
  public maxDate: Date = new Date();

  private fields: Array<string> = [
    'id',
    'employer',
    'job_title',
    'start_date',
    'end_date',
    'salary_earned',
    'employer',
    'reason_for_leaving'
  ];

  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              private platformCheck: PlatformCheckService) {

    this.defaultDate = new Date();
    this.birthDateYearsRange = ProfileUtilities.getDatesRangePeriod(0, 70);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.item) {
      this.createForm(this.item);
      if (this.mode === ProfileTabMode.VIEW) {
        ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
      }
    }

    if (this.serverError) {
      this.errorMessage = this.serverError;
    }
  }

  public ngOnDestroy(): void {
    this.closeError();
  }

  public ngOnInit(): void {
    if (this.platformCheck.isBrowser) {
      this.componentInited = true;
    }
  }

  public toggleDatePicker(event: MouseEvent, type: string): void {
    if (type === 'start') {
      this.startDatePicker.showOverlay(this.startDatePicker.inputfieldViewChild.nativeElement);
    } else {
      this.endDatePicker.showOverlay(this.endDatePicker.inputfieldViewChild.nativeElement);
    }
    event.stopPropagation();
  }

  public closeError(): void {
    this.errorMessage = null;
  }

  public submitItem(): void {
    if (this.mode === ProfileTabMode.CREATE) {
      this.createReference();
    } else {
      this.updateItem();
      ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
    }
  }

  public createReference(): void {
    const isBlank: boolean = this.checkForBlank(this.modelForm.value);

    if (isBlank) {
      this.errorMessage = 'Please fill out all fields.';
    } else {
      this.checkSalaryEarnedValue();
      this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
      this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
      this.onItemCreate.emit(this.parseModel(ProfileUtilities.parseModel(this.modelForm.value, this.fields)));
    }
  }

  public onEdit(): void {
    if (this.mode === ProfileTabMode.VIEW) {
      this.mode = ProfileTabMode.EDIT;
      this.onItemEditStart.emit(this.mode);
    } else {
      this.mode = ProfileTabMode.VIEW;
    }
    ProfileUtilities.changeModelMode(this.mode, this.modelForm);
  }

  /**
   * Method to remove item
   */
  public removeItem(): void {
    const isVoid: boolean = !this.fields.some((field: string) => {
      if (field === 'end_date' && this.modelForm.value[field] === this.presentTime) {
        return false;
      }
      return this.modelForm.value[field]
    });

    if (!isVoid) {
      const modal: NgbModalRef = this.modalService.open(AlertModalComponent, {
        backdrop: false
      });

      modal.result.then(() => {
        this.onItemRemove.emit(this.item.id || 0);
      }, () => {
        /*Canceled*/
      });

      modal.componentInstance.title = 'Wait';
      if (this.mode === ProfileTabMode.CREATE) {
        modal.componentInstance.message = `Are you sure you want to cancel creating work experience? `;
      } else {
        modal.componentInstance.message = `Are you sure you want to remove ${this.item.employer || 'selected'} experience?`;
      }
    } else {
      this.onItemRemove.emit(this.item.id || 0);
    }
  }

  /**
   * Method to update item, send to server
   */
  private updateItem(): void {
    Object.keys(this.modelForm.value)
      .forEach((field: string) => {
        if (this.fields.some((innerField: string) => innerField === field)) {
          this.modelForm.enable();
        } else {
          this.modelForm.disable();
        }
      });
    this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
    this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
    const endDateValue: string = this.modelForm.value.end_date;
    if (endDateValue === this.presentTime) {
      this.modelForm.value.end_date = null;
    }
    this.modelForm.value.id = this.item.id;

    const model: any = {};
    this.fields.forEach((field: string) => {
      model[field] = this.modelForm.value[field];
    });
    this.onItemUpdate.emit(model);
  }

  private createForm(item?: IWorkExperienceEntity): void {
    this.buildForm(item);
  }

  private parseModel(model: any): any {
    if (model.end_date === this.presentTime) {
      model.end_date = null;
    }
    return model;
  }

  private checkSalaryEarnedValue(): void {
    const salaryValue: any = this.modelForm.get('salary_earned').value;

    if (Number.isNaN(+salaryValue) || salaryValue < 0) {
      this.modelForm.get('salary_earned').setValue(+Math.abs(salaryValue));
    }
  }

  private buildForm(item?: IWorkExperienceEntity): void {
    if (!item) {
      item = ProfileUtilities.createObject(this.fields);
    }

    this.modelForm = this.fb.group({
      employer: [item.employer],
      job_title: [item.job_title],
      start_date: [ProfileUtilities.checkDate(item.start_date)],
      end_date: [ProfileUtilities.checkDate(item.end_date)],
      salary_earned: [item.salary_earned],
      reason_for_leaving: [item.reason_for_leaving],
      currentlyWorkHere: [!item.end_date]
    });

    if (!item.end_date) {
      this.endDatePlaceholder = this.presentTime;
      this.modelForm.get('end_date').disable();
    }

    if (this.mode === ProfileTabMode.CREATE) {
      this.endDatePlaceholder = null;
      this.modelForm.get('end_date').enable();
      this.modelForm.get('currentlyWorkHere').setValue(false);
    }

    this.modelForm.valueChanges
      .filter(() => !!this.errorMessage)
      .subscribe(() => this.errorMessage = null);
  }

  public currentlyWorkHereChanged(state: boolean): void {
    const endDate: AbstractControl = this.modelForm.get('end_date');
    if (state) {
      endDate.setValue(null);
      this.endDatePlaceholder = this.presentTime;
    } else {
      endDate.setValue(null);
      this.endDatePlaceholder = 'Select end date';
    }
    state ? endDate.disable() : endDate.enable();
  }

  /**
   * Return if Model is blank
   * @param model
   * @returns {boolean}
   */
  private checkForBlank(model: any): boolean {
    if (model) {
      return !Object.keys(model).some((key: string) => {
        if (key === 'end_date' && model[key] === this.presentTime) {
          return false;
        }
        return !!model[key]
      });
    }
    return false;
  }
}