import {
  ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ShowValidationErrors} from '../../../../../core/validators/show-validation-errors.model';
import {
  AccordionTabProfileErrors, COMPONENT_RESTRICTIONS, FIELD_SETTINGS, IProfileModel,
  IProfileTabsMaskSettings
} from './accordion-tab-profile.model';
import {REGEX_LINKED_IN, REGEX_ZIP_PATTERN} from '../../../../../core/validators/validation-patterns.model';
import {ProfileAccordionService} from '../../profile-accordion.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {IProfile} from '../../user-profile.model';
import {IErrorResponse} from '../../../../../core/models/core.model';
import {UserProfileService} from '../../user-profile.service';
import {ProfileUtilities} from '../../profile-utilities.service';
import {PlatformCheckService} from '../../../../../core/services/platform-check.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-accordion-tab-profile',
  templateUrl: 'accordion-tab-profile.html'
})
export class AccordionTabProfileComponent extends ShowValidationErrors implements OnInit, OnChanges, OnDestroy {

  @ViewChild('birthDate')
  birthDateCalendar: any;

  @Input()
  profile: IProfileModel;

  @Input()
  accordionId: string;

  @Output()
  onAccordionClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Field to set any error message
   */
  public errorMessage: string;

  /**
   * Root Angular Form
   */
  public modelForm: FormGroup;
  /**
   * Form Errors
   */
  public fm: any;

  public phoneNumberFocus: string;

  public birth_date: NgbDateStruct;

  public isRequestSending: boolean = false;

  private componentRestrictions: any;

  public fieldsSettings: IProfileTabsMaskSettings;
  public componentInited: boolean = false;
  private destroyed$: Subject<any> = new Subject<any>();

  /**
   * Fields that need to send to server
   * @type {[string,string,string,string,string,string,string,string]}
   */
  private fields: Array<string> = [
    'birth_date',
    'city',
    'full_name',
    'linkedin_url',
    'phone_number',
    'state',
    'street_address',
    'postal_code',
  ];

  private dataCopy: any = {};

  public birthDateYearsRange: string;
  public defaultDate: Date;

  constructor(private fb: FormBuilder,
              public formErrorsModel: AccordionTabProfileErrors,
              private changeDetector: ChangeDetectorRef,
              private accordionService: ProfileAccordionService,
              private profileService: UserProfileService,
              private platformCheckService: PlatformCheckService) {
    super();

    this.defaultDate = new Date();
    this.componentRestrictions = COMPONENT_RESTRICTIONS;
    this.fieldsSettings = FIELD_SETTINGS;

    this.accordionSubscriptions();

    this.setPeriodsDate();
  }

  public ngOnInit(): void {
    if (this.platformCheckService.isBrowser) {
      this.componentInited = true;
    }
  }

  public ngOnChanges() {
    if (this.profile) {
      this.createModelForm();
    }
  }

  public ngOnDestroy() {
    this.checkIfDataUpdated();
    this.destroyed$.next();
    this.destroyed$.complete();
    this.changeDetector.detach();
  }

  public toggleDatePicker(event: MouseEvent): void {
    this.birthDateCalendar.showOverlay(this.birthDateCalendar.inputfieldViewChild.nativeElement);
    event.stopPropagation();
  }

  /**
   * Method to set PhoneNumber value
   * @param value
   */
  public onPhoneNumberInput(value: string): void {
    this.modelForm.controls['phone_number'].setValue(value);
  }

  /**
   * Method to set value to specific field
   * @param field
   * @param value
   */
  public setFieldValue(field: string , value: string | any): void {
    if (field === 'street_address') {
      if (value && value.formatted_address) {
        value = value.formatted_address;
      }
    }
    this.modelForm.controls[field].setValue(value);

    this.changeDetector.detectChanges();
  }

  private setPeriodsDate(offset: number = 16): void {
    const currentDate: Date = new Date();
    const maxYear: number = (currentDate.getFullYear() - offset);
    const minYear: number = maxYear - 90;
    this.birthDateYearsRange = `${minYear}:${maxYear}`;
  }

  /**
   * Send form to server
   * */
  private saveForm(calback?: Function): void {
    if (!this.modelForm) {
      return;
    }

    this.validateForm();

    if (this.modelForm.invalid) {
      super.onValueChanged();
      return;
    }

    this.modelForm.value.birth_date = ProfileUtilities.parseDateWithFormat(this.modelForm.value.birth_date);

    const data: any = ProfileUtilities.parseModel(this.modelForm.value, this.fields);

    this.profileService.updateProfileForm(data)
      .do(() => this.isRequestSending = true)
      .finally(() => this.isRequestSending = false)
      .subscribe(
        (response: IProfile) => {
          this.dataCopy = data;
          this.updateProfile(response);
          /**
           * Trigger callback
           */
          calback && calback();
        },
        (error: IErrorResponse) => this.errorMessage = error.message
      );
  }

  private validateForm(): void {
    this.modelForm.get('isGlobalValidate').setValue(true);
  }

  public closeError(field: string): void {
    this.fm[field] = '';
  }

  /**
   *  Method to Compare two Objects
   * @param model
   * @param copy
   * @returns {boolean}
   */
  private compareModels(model: IProfileModel , copy: IProfileModel): boolean {
    return this.fields.some((field: string) => {
      return model[field] !== copy[field];
    });
  }

  /**
   * Method to subscribe to accordion service
   */
  private accordionSubscriptions(): void {
    this.accordionService.accordionState$
      .takeUntil(this.destroyed$)
      .filter((state: any) => state && state.event &&  !state.event.nextState)
      .distinctUntilChanged(null, state => state.event.nextState)
      .subscribe(
        (state: any) => this.onComponentClose(state)
      );
  }

  private onComponentClose(state: any): void {
    if (this.modelForm.invalid) {
      state.event.preventDefault();
      this.validateForm();
      super.onValueChanged();
    }

    const callbackBefore = () => {
      state.event.preventDefault();
    };

    const callbackAfter = () => {
      state.accordion.toggle(this.accordionId);
    };

    this.checkIfDataUpdated(callbackBefore, callbackAfter);
  }

  /**
   * method to create form
   */
  private createModelForm(): void {
    if (!this.modelForm && this.profile) {
      this.buildForm();
    }

    if (this.modelForm) {
      super.setData(this.modelForm, this.formErrorsModel);

      this.fm = this.formErrorsModel.formErrors;

      this.modelForm.valueChanges
        .subscribe(() => super.onValueChanged());

      this.changeDetector.detectChanges();
    }
  }

  /**
   * Method to build FormGroup
   */
  private buildForm(): void {
    this.modelForm = this.fb.group({
      full_name: [this.profile ? this.profile.full_name : '',[
        Validators.required
      ]],
      email: [{
        value: this.profile ? this.profile.email : '',
        disabled: true /*Disabling */
      }],
      phone_number: [ this.profile ? this.profile.phone_number : ''],
      street_address: [ this.profile ? this.profile.street_address : ''],
      city: [ this.profile ? this.profile.city : ''],
      state: [ this.profile ? this.profile.state : ''],
      postal_code: [ this.profile ? this.profile.postal_code : '' , [
        Validators.pattern(REGEX_ZIP_PATTERN)
      ]],
      birth_date: [ this.profile ? this.getDate(this.profile.birth_date ? this.profile.birth_date.toString() : null) : null],
      birthDate: [ null],
      linkedin_url: [  this.profile ? this.profile.linkedin_url : '', [
        Validators.pattern(REGEX_LINKED_IN)
      ]],
      isGlobalValidate: [false]
    });

    if (!this.profile.birth_date) {
      this.setPeriodsDate(0);
    }

    this.dataCopy = ProfileUtilities.parseModel(this.modelForm.value, this.fields);
  }

  /**
   * Method to check if model's updated
   * @param callbackBefore
   * @param callbackAfter
   */
  private checkIfDataUpdated(callbackBefore?: Function, callbackAfter?: Function): void {
    if (this.compareModels(ProfileUtilities.parseModel(this.modelForm.value, this.fields), this.dataCopy)) {
      if (callbackBefore) {
        callbackBefore();
      }
      this.saveForm(callbackAfter);
    }
  }

  /**
   * Method to trigger profile update
   * @param {IProfile} profile
   */
  private updateProfile(profile: IProfile): void {
    this.accordionService.profileUpdate$.next({
      profile: profile,
      needClose: false
    });
  }

  private getDate(date: string): Date | null {
    if (Date.parse(date)) {
      return new Date(date);
    }
    return null;
  }

  private parseDate(date: Date | string): string {
    if (date instanceof Date) {
      date = date.toString();
    }
    return new Date(date).toDateString();
  }
}