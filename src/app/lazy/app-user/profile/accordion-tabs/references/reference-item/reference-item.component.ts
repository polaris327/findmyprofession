import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

import {IReferenceItem} from './reference-item.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AlertModalComponent} from '../../../../../../modules/alert-modal/alert-modal.component';
import {ProfileUtilities} from '../../../profile-utilities.service';
import {ProfileTabMode} from '../../../user-profile.model';

@Component({
  selector: 'fmp-reference-item-component',
  templateUrl: 'reference-item.html'
})
export class ReferenceItemComponent implements OnChanges, OnDestroy {

  @Input()
  mode: ProfileTabMode;

  @Input()
  item: IReferenceItem;

  @Input()
  serverError: string;

  @Output()
  onItemCreate: EventEmitter<IReferenceItem> = new EventEmitter<IReferenceItem>();

  @Output()
  onItemRemove: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  onItemEditStart: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onItemUpdate: EventEmitter<IReferenceItem> = new EventEmitter<IReferenceItem>();

  public modelForm: FormGroup;
  public isRequestSending: boolean = false;
  public errorMessage: string;

  /**
   * Fields that need to send to server
   * @type {[string,string,string,string,string,string,string]}
   */
  private fields: Array<string> = [
    'id',
    'name',
    'job_title',
    'company',
    'email',
    'phone_number',
    'relationship'
  ];

  constructor(private fb: FormBuilder,
              private modalService: NgbModal) {
  }

  /**
   * Detect of mode changes
   * @param changes
   */
  public ngOnChanges(changes: SimpleChanges): void {
    /**
     * If mode
     */
    if (changes['item'] && changes['item'].currentValue) {
      if (this.mode === ProfileTabMode.CREATE) {
        this.createForm();
      } else {
        this.createForm(this.item);
      }
    }

    if (changes['mode'] && changes['mode'].currentValue) {
      ProfileUtilities.changeModelMode(this.mode, this.modelForm);
    }

    const serverError: SimpleChange = changes['serverError'];
    if (serverError && !serverError.firstChange && serverError.currentValue !== null) {
      this.errorMessage = this.serverError;
    }
  }

  public ngOnDestroy(): void {
    this.modelForm.reset();
  }

  public submitItem(): void {
    if (this.mode === ProfileTabMode.CREATE) {
      this.createReference();
    } else {
      ProfileUtilities.changeModelMode(ProfileTabMode.VIEW, this.modelForm);
      this.modelForm.value.id = this.item.id;
      this.onItemUpdate.emit(ProfileUtilities.parseModel(this.modelForm.value, this.fields));
    }
  }

  public createReference(): void {
    const isBlank: boolean = ProfileUtilities.checkForBlank(this.modelForm.value);

    if (isBlank) {
      this.errorMessage = 'Please fill out all fields.';
    } else {
      this.onItemCreate.emit(ProfileUtilities.parseModel(this.modelForm.value, this.fields));
    }
  }

  /**
   * method to switch mode
   */
  public switchEditMode(): void {
    if (this.mode === ProfileTabMode.VIEW) {
      this.mode = ProfileTabMode.EDIT;
      this.onItemEditStart.emit(this.mode);
    } else {
      this.mode = ProfileTabMode.VIEW;
    }

    ProfileUtilities.changeModelMode(this.mode, this.modelForm);
  }

  public inputField(field: string, value: string): void {
    if (this.modelForm.controls[field]) {
      this.modelForm.controls[field].setValue(value);
    }
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

      Observable.fromPromise(modal.result)
        .subscribe(
          () => this.onItemRemove.emit(this.item.id || 0),
          () => {/*Canceled*/});

      modal.componentInstance.title = 'Wait';
      if (this.mode === ProfileTabMode.CREATE) {
        modal.componentInstance.message = `Are you sure you want to cancel creating reference? `;
      } else {
        modal.componentInstance.message = `Are you sure you want to remove ${this.item.name || 'selected'} reference?`;
      }
    } else {
      this.onItemRemove.emit(this.item.id || 0);
    }
  }

  public closeError(): void {
    this.errorMessage = '';
  }

  /**
   * Method that creates new form
   * @param item
   */
  private createForm(item?: IReferenceItem): void {
    this.buildForm(item);
  }

  /**
   * Method to build FormGroup
   * @param item
   */
  private buildForm(item?: IReferenceItem): void {
    this.modelForm = this.fb.group({
      name: [item ? item.name : null],
      job_title: [item ? item.job_title : null],
      company: [item ? item.company : null],
      email: [item ? item.email : null],
      phone_number: [item ? item.phone_number : null],
      relationship: [item ? item.relationship : null]
    });

    this.modelForm.valueChanges
      .filter(() => !!this.errorMessage)
      .subscribe(() => this.errorMessage = null);

    ProfileUtilities.changeModelMode(ProfileTabMode.CREATE, this.modelForm);
  }
}