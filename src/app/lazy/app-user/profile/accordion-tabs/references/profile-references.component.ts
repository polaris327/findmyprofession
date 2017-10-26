import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

import {IReferenceItem} from './reference-item/reference-item.model';
import {IProfileReferenceEntity, IProfileReferences} from './profile-references.model';
import {UserProfileService} from '../../user-profile.service';
import {IProfile, ProfileTabMode} from '../../user-profile.model';
import {IErrorResponse} from '../../../../../core/models/core.model';

@Component({
  selector: 'fmp-profile-reference-component',
  templateUrl: 'profile-references.html'
})
export class ProfileReferenceComponent implements OnChanges {

  @Input()
  references: Array<IReferenceItem>;

  @Output()
  onProfileUpdate: EventEmitter<IProfile> =  new EventEmitter<IProfile>();

  public errorMessage: string | null;

  private reference: IReferenceItem = {
    name: '',
    job_title: '',
    company: '',
    email: '',
    phone_number: '',
    relationship: ''
  };

  public referenceList: IProfileReferences = {
    existing: [],
    creating: []
  };

  constructor(private profileService: UserProfileService) {}

  public ngOnChanges() {
    if (Array.isArray(this.references)) {
      this.referenceList.existing = this.references.map((reference: IReferenceItem) => {
        return {
          item: reference,
          mode: ProfileTabMode.VIEW
        };
      });
    }
  }

  public removeReference(itemId: number , itemIndex: number, mode: ProfileTabMode): void {
    if (mode === ProfileTabMode.CREATE) {
      this.referenceList.creating.splice(0 ,1);
    } else {

      this.profileService.removeReference(itemId)
        .subscribe(
          () => this.removeReferenceFromList(itemIndex),
          this.handleError.bind(this)
        );

    }
  }

  private removeReferenceFromList(itemIndex: number): void {
    this.referenceList.existing.splice(itemIndex, 1);
  }

  public updateReference(reference: IReferenceItem, item: IProfileReferenceEntity): void {
    this.profileService.updateReference(reference)
      .subscribe(
        (profile: IProfile) => {
          item.mode = ProfileTabMode.VIEW;
          this.onProfileUpdate.emit(profile);
        },
        this.handleError.bind(this)
      );
  }

  public itemEditStart(mode: ProfileTabMode , item: IProfileReferenceEntity): void {
    item.mode = mode;
  }

  public addReference(): void {
    if (this.referenceList.creating && this.referenceList.existing) {
      const list: Array<IReferenceItem> = this.referenceList.creating;

      this.referenceList.existing.forEach((item: IProfileReferenceEntity) => {
        item.mode = ProfileTabMode.VIEW
      });

      if (Array.isArray(list) && list.length === 0) {
        this.referenceList.creating.push(Object.assign({} , this.reference));
      }
    }
  }

  public createItem(item: IReferenceItem): void {
    if (this.referenceList.creating && this.referenceList.existing) {
      this.clearError();
      this.profileService.createReference(item)
        .subscribe(
          (response: IProfile) => this.createItemHandler(response),
          this.handleError.bind(this)
        );
    }
  }

  private createItemHandler(response: IProfile): void {
    this.referenceList.creating = [];
    this.onProfileUpdate.emit(response);
  }

  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }

  private clearError(): void {
    this.errorMessage = '';
  }
}