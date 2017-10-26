import {
  AfterViewInit,
  ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ICareerPreferencesForm, ICareerPreferencesModel} from './career-preferences.model';
import {IProfile} from '../../user-profile.model';
import {CAREER_PREFERENCES_DATA} from './career-preferences-data.model';
import {UserProfileService} from '../../user-profile.service';
import {IErrorResponse} from '../../../../../core/models/core.model';
import {ProfileAccordionService} from '../../profile-accordion.service';

@Component({
  selector: 'fmp-accordion-tab-career-preferences',
  templateUrl: 'career-preferences.html'
})
export class AccordionTabCareerPreferencesComponent implements OnChanges, AfterViewInit, OnDestroy{

  @ViewChild('desireSalary')
  desireSalary: any;

  @ViewChild('industryBlock')
  industryBlock: ElementRef;

  @Input()
  careerPreferences: ICareerPreferencesForm;

  public modelForm: FormGroup;
  public errorMessage: string;
  public isRequestSending: boolean = false;
  public isModelFormChanged: boolean = false;

  public selectData: ICareerPreferencesModel;

  constructor(private fb: FormBuilder,
              private profileService: UserProfileService,
              private changeDetector: ChangeDetectorRef,
              private accordionService: ProfileAccordionService) {

    this.selectData = CAREER_PREFERENCES_DATA;
  }

  public ngAfterViewInit(): void {
    if (this.industryBlock && this.industryBlock.nativeElement) {
      (<HTMLDivElement>this.industryBlock.nativeElement).scrollIntoView(false);
    }
  }

  public ngOnChanges(): void {
    if (this.careerPreferences) {
      this.buildForm(this.careerPreferences);
    }
  }

  public ngOnDestroy(): void {
    this.checkForChanges();
    this.changeDetector.detach();
  }

  public onSelect(field: string, value: string): void {
    this.modelForm.markAsDirty();
    this.modelForm.controls[field].setValue(value);
  }

  public addNewTag(tagTitle: string , field: string): void {
    this.modelForm.markAsDirty();
    const titles: Array<string> = this.modelForm.controls[field].value;
    if (Array.isArray(titles)) {
      titles.push(tagTitle);
    }
    this.modelForm.controls[field].setValue(titles);
  }

  public removeExistingTag(tagTitle: string , field: string): void {
    this.modelForm.markAsDirty();
    const titles: Array<string> = this.modelForm.controls[field].value;
    if (Array.isArray(titles)) {
      const index: number = titles.indexOf(tagTitle);

      if (index !== -1) {
        titles.splice(index, 1);
      }
    }
    this.modelForm.controls[field].setValue(titles);
  }

  /**
   * Method to send request to server
   */
  public saveForm(): void {

    let request: ICareerPreferencesForm = this.modelForm.value;
    request.job_types = this.parseJobTypes(this.modelForm.value.job_types);

    this.isRequestSending = true;

    this.profileService.updateCareerPreferences(request)
      .finally(() => this.isRequestSending = false)
      .subscribe(
        (response: IProfile) => this.accordionService.profileUpdate$.next({
          profile: response,
          activeId: 'profile-accordion-2',
          needClose: false
        }),
        this.handleError.bind(this)
      );
  }

  /**
   * Method to build FormGroup
   * @param model
   */
  private buildForm(model: ICareerPreferencesForm): void {
    this.modelForm = this.fb.group({
      industry: [model.industry],
      job_titles: [model.job_titles || []],
      job_types: this.fb.array(this.inverseParseJobTypes(model.job_types)),
      education: [model.education],
      experience: [model.experience],
      relocation_value: [model.relocation_value || 0],
      relocation_type: [model.relocation_type],
      relocation_location: [model.relocation_location || []],
      desire_salary_value: [model.desire_salary_value || 0],
      desire_salary_type: [model.desire_salary_type]
    });

    this.changeDetector.detectChanges();

    this.modelForm.get('relocation_value').valueChanges
      .filter((valueState: boolean) => !valueState)
      .subscribe(
        (valueState: boolean) => this.refreshRelocation()
      );

    this.modelForm.valueChanges
      .subscribe(() => this.isModelFormChanged = true)
  }

  /**
   * Method to Parse list of boolean values to selected job types.
   * @param list
   * @returns {any}
   */
  private parseJobTypes(list: Array<boolean>): Array<string> {
    let array: Array<string> = [];
    if (Array.isArray(list)) {
      return this.selectData.types.filter((item: string, index: number) => {
        return list[index] === true;
      });
    }
    return array;
  }

  /**
   * Method to parse list of string values to selected boolean
   * @param list
   * @returns {[any,any,any,any,any]}
   */
  private inverseParseJobTypes(list: Array<string>): Array<boolean> {
    if (Array.isArray(list) && Array.isArray(this.selectData.types)) {
      return this.selectData.types.map((item: string) => {
        return list.includes(item);
      })
    }
    return [...this.selectData.types.map(() => {return false})];
  }

  /**
   * Method to refresh relocation values
   */
  private refreshRelocation(): void {
    this.modelForm.get('relocation_type').setValue(null);
    this.modelForm.get('relocation_location').setValue([]);
  }

  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }

  private checkForChanges(): void {
    if (this.isModelFormChanged) {
      this.saveForm();
    }
  }
}