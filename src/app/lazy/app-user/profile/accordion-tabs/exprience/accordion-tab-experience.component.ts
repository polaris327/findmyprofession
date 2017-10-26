import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {IWorkExperienceEntity, IWorkExperienceTab} from './work-experience-item/work-experience-item.model';
import {IEducationExperienceList, IWorkExperienceList} from './accordion-tab-experience.model';
import {IProfile, ProfileTabMode} from '../../user-profile.model';
import {UserProfileService} from '../../user-profile.service';
import {IErrorResponse} from '../../../../../core/models/core.model';
import {IEducationEntity, IEducationTab} from './education-experience-item/education-experience-item.model';

@Component({
  selector: 'fmp-accordion-tab-experience',
  templateUrl: 'accordion-tab-experience.html'
})

export class AccordionTabExperienceComponent implements OnChanges {

  @Input()
  workExperience: Array<IWorkExperienceEntity>;

  @Input()
  educationExperience: Array<IEducationEntity>;


  @Output()
  onProfileUpdate: EventEmitter<IProfile> = new EventEmitter<IProfile>();

  public workExperienceList: IWorkExperienceList;
  public educationExperienceList: IEducationExperienceList;

  public errorMessage: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['workExperience'] && changes['workExperience'].currentValue) {
      this.workExperienceList = {
        creating: [],
        existing: [
          ...this.workExperience.map((item: IWorkExperienceEntity) => {
            return {
              item: item,
              mode: ProfileTabMode.VIEW
            }
          })
        ]
      };
    }

    if (changes['educationExperience'] && changes['educationExperience'].currentValue) {
      this.educationExperienceList = {
        creating: [],
        existing: [
          ...this.educationExperience.map((item: IEducationEntity) => {
            return {
              item: item,
              mode: ProfileTabMode.VIEW
            }
          })
        ]
      };
    }
  }

  private workExperienceEntity: IWorkExperienceEntity = {
    employer: '',
    job_title: '',
    start_date: '',
    end_date: '',
    salary_earned: 0,
    reason_for_leaving: ''
  };

  private educationExperienceEntity: IEducationEntity = {
    institution: '',
    discipline: '',
    level: '',
    start_date: '',
    end_date: ''
  };

  constructor(private profileService: UserProfileService) {
  }

  public itemEditStart(mode: ProfileTabMode , item: IWorkExperienceTab): void {
    item.mode = mode;
  }

  /**
   * Method to remove Work Experience or Education entity
   * @param itemId - id of entity
   * @param itemIndex - index in array
   * @param mode - current tab entity mode
   * @param isEducation - if flag true , will send to education
   */
  public removeExperience(
    itemId: number,
    itemIndex: number,
    mode: ProfileTabMode,
    isEducation: boolean = false): void {

    if (mode === ProfileTabMode.CREATE) {
      if (isEducation) {
        this.educationExperienceList.creating.splice(0 ,1);
      } else {
        this.workExperienceList.creating.splice(0, 1);
      }
    } else {
      this.profileService.removeExperienceItem(itemId, isEducation)
        .subscribe(
          (response: IProfile) => {
            this.removeExperienceFromList(itemIndex);
            this.updateProfile(response)
          },
          (error: IErrorResponse) => this.handleError(error)
        );
    }
  }

  /**
   * Remove entity from local list
   * @param itemIndex
   * @param isEducation
   */
  private removeExperienceFromList(itemIndex: number, isEducation: boolean = false): void {
    if (isEducation) {
      this.educationExperienceList.existing.splice(itemIndex, 1);
    } else {
      this.workExperienceList.existing.splice(itemIndex, 1);
    }
  }

  /**
   * Method that creates Work Experience Entity
   */
  public addWorkExperience(): void {
    if (this.workExperienceList.creating && this.workExperienceList.existing) {
      const list: Array<IWorkExperienceEntity> = this.workExperienceList.creating;
      this.workExperienceList.existing.forEach((item: IWorkExperienceTab) => {
        item.mode = ProfileTabMode.VIEW
      });
      if (Array.isArray(list) && list.length === 0) {
        this.workExperienceList.creating.push(Object.assign({}, this.workExperienceEntity));
      }
    }
  }

  /**
   * Method that creates Education Experience Entity
   */
  public addEducationExperience(): void {
    if (this.educationExperienceList.creating && this.educationExperienceList.existing) {
      const list: Array<IEducationEntity> = this.educationExperienceList.creating;
      this.educationExperienceList.existing.forEach((item: IEducationTab) => {
        item.mode = ProfileTabMode.VIEW
      });
      if (Array.isArray(list) && list.length === 0) {
        this.educationExperienceList.creating.push(Object.assign({}, this.educationExperienceEntity));
      }
    }
  }

  /**
   * Method that updates Work Experience or Education entity
   * @param experience
   * @param item
   * @param isEducation if need to update Education , must be true
   */
  public updateExperience(
    experience: IWorkExperienceEntity | IEducationEntity,
    item: IWorkExperienceTab | IEducationTab,
    isEducation: boolean = false): void {

    this.profileService.updateExperience(experience, isEducation)
      .subscribe(
        (profile: IProfile) => {
          item.mode = ProfileTabMode.VIEW;
          this.updateProfile(profile);
        },
        (error: IErrorResponse) => this.handleError(error)
      );
  }

  /**
   * Method that send Work Experience Entity to server
   * @param item
   */
  public createWorkExperienceItem(item: IWorkExperienceEntity): void {
    if (this.workExperienceList.creating && this.workExperienceList.existing) {
      this.profileService.createExperienceItem(item)
        .subscribe(
          (response: IProfile) => {
            this.workExperienceList.creating = [];

            this.workExperienceList.existing.push({
              item: item,
              mode: ProfileTabMode.VIEW
            });
            this.updateProfile(response);
          },
          (error: IErrorResponse) => this.handleError(error)
        );
    }
  }

  /**
   * Method that send Education Experience Entity to server
   * @param item
   */
  public createEducationExperienceItem(item: IEducationEntity): void {
    if (this.educationExperienceList.creating && this.educationExperienceList.existing) {
      this.profileService.createExperienceItem(item, true)
        .subscribe(
          (response: IProfile) => {
            this.educationExperienceList.creating = [];

            this.educationExperienceList.existing.push({
              item: item,
              mode: ProfileTabMode.VIEW
            });
            this.updateProfile(response);
          },
          (error: IErrorResponse) => this.handleError(error)
        );
    }
  }

  /**
   * Method to handle error message
   * @param error
   */
  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }

  /**
   * Method to update profile
   * @param profile
   */
  private updateProfile(profile: IProfile): void {
    this.onProfileUpdate.emit(profile);
  }
}