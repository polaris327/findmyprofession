import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ProfileTabMode} from '../../../user-profile.model';
import {ProfileUtilities} from '../../../profile-utilities.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {IEducationEntity} from './education-experience-item.model';
import {AlertModalComponent} from '../../../../../../modules/alert-modal/alert-modal.component';

@Component({
  selector: 'fmp-education-experience-item',
  templateUrl: 'education-experience-item.html'
})
export class EducationItemComponent implements OnChanges, OnDestroy {

  @ViewChild('startDatePicker')
  startDatePicker: any;

  @ViewChild('endDatePicker')
  endDatePicker: any;


  @Input()
  mode: ProfileTabMode;

  @Input()
  item: IEducationEntity;

  @Input()
  serverError: string;

  @Output()
  onItemCreate: EventEmitter<IEducationEntity> = new EventEmitter<IEducationEntity>();

  @Output()
  onItemEditStart: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onItemUpdate: EventEmitter<IEducationEntity> = new EventEmitter<IEducationEntity>();

  @Output()
  onItemRemove: EventEmitter<number> = new EventEmitter<number>();

  public modelForm: FormGroup;
  public fm: any;
  public errorMessage: string | null = null;

  private fields: Array<string> = [
    'id',
    'institution',
    'discipline',
    'start_date',
    'level',
    'end_date'
  ];

  public educationLevels: Array<string> = [
    'High School Diploma',
    'Associates Degree',
    'Bachelors Degree',
    'Master or Ph.D'
  ];

  public startDateYearsRange: string;
  public endDateYearsRange: string;
  public defaultDate: Date;

  constructor(private fb: FormBuilder,
              private modalService: NgbModal) {
    this.defaultDate = new Date();
    this.startDateYearsRange = ProfileUtilities.getDatesRangePeriod(0, 70);
    this.endDateYearsRange = ProfileUtilities.getDatesRangePeriod(-10, 70);
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
    this.errorMessage = null;
    this.modelForm.reset();
  }

  public toggleDatePicker(event: MouseEvent, type: string): void {
    if (type === 'start') {
      this.startDatePicker.showOverlay(this.startDatePicker.inputfieldViewChild.nativeElement);
    } else {
      this.endDatePicker.showOverlay(this.endDatePicker.inputfieldViewChild.nativeElement);
    }
    event.stopPropagation();
  }

  public submitItem(): void {
    if (this.mode === ProfileTabMode.CREATE) {
      this.createReference();
    } else {
      ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
      this.modelForm.value.id = this.item.id;
      this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
      this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
      this.onItemUpdate.emit(ProfileUtilities.parseModel(this.modelForm.value, this.fields));
    }
  }

  public closeError(): void {
    this.errorMessage = null;
  }

  public createReference(): void {
    const isBlank: boolean = ProfileUtilities.checkForBlank(this.modelForm.value);

    if (isBlank) {
      this.errorMessage = 'Please fill out all fields.';
    } else {
      this.modelForm.value.start_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.start_date);
      this.modelForm.value.end_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.end_date);
      this.onItemCreate.emit(this.modelForm.value);
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
    const isVoid: boolean = !this.fields.some((field: string) => this.modelForm.value[field]);

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
        modal.componentInstance.message = `Are you sure you want to cancel creating education experience?`;
      } else {
        modal.componentInstance.message = `Are you sure you want to remove ${this.item.institution || 'selected'} education?`;
      }
    } else {
      this.onItemRemove.emit(this.item.id || 0);
    }
  }

  public educationLevelChanged(level: string): void {
    this.modelForm.get('level').setValue(level);
  }

  private createForm(item?: IEducationEntity): void {
    this.buildForm(item);
  }

  private buildForm(item?: IEducationEntity): void {
    if (!item) {
      item = ProfileUtilities.createObject(this.fields);
    }

    this.modelForm = this.fb.group({
      institution: [item.institution],
      discipline: [item.discipline],
      level: [item.level],
      start_date: [ProfileUtilities.checkDate(item.start_date)],
      end_date: [ProfileUtilities.checkDate(item.end_date)]
    });

    this.modelForm.valueChanges
      .filter(() => !!this.errorMessage)
      .subscribe(() => this.errorMessage = null);
  }
}