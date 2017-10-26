import {
  AfterViewInit, ChangeDetectorRef, Component, OnDestroy, Renderer2, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AccordionData, IProfile, IUserProfileAccordion, ProfileUpdateEvent} from './user-profile.model';
import {ActivatedRoute, Router} from '@angular/router';

import {ProfileAccordionService} from './profile-accordion.service';
import {NgbAccordion} from '@ng-bootstrap/ng-bootstrap';
import {
  IProgressReference, IProgressReferenceEntity,
  PROGRESS_REFERENCES
} from './profile-progress/profile-progress.model';
import {IProfileQuestionsModel} from './accordion-tabs/questions/accordion-tab-questions.model';
import {ProfileUtilities} from './profile-utilities.service';
import {IUser} from '../../../core/models/user.model';
import {UserService} from '../../../core/services/user.service';
import {PlatformCheckService} from '../../../core/services/platform-check.service';
import {ResizeModeService} from '../../../core/services/resize-mode.service';
import {MODE_MOB} from '../../../core/models/core.model';
import {Title} from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-user-profile-holder',
  templateUrl: 'user-profile.html',
  styles: [require('./user-profile.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class UserProfileHolderComponent implements OnDestroy, AfterViewInit {

  @ViewChild('profileAccordion')
  profileAccordion: NgbAccordion;

  public profile: IProfile;
  public panelActiveId: string | null = null;

  public user: IUser | null;
  private destroyed$: Subject<any> = new Subject<any>();

  public progressReferences: Map<string, IProgressReference>;

  public accordionData: Array<IUserProfileAccordion>;

  public isMobileMode: boolean;

  private questionModel: IProfileQuestionsModel = {
    work_authorization: null,
    gender: null,
    veteran_status: null,
    disability_status: null,
    race_ethnicity: null
  };

  constructor(private userService: UserService,
              private accordionService: ProfileAccordionService,
              private route: ActivatedRoute,
              private router: Router,
              private changeDetector: ChangeDetectorRef,
              private platformService: PlatformCheckService,
              private resizeModeService: ResizeModeService,
              private titleService: Title,
              private platformCheckService: PlatformCheckService,
              private domRenderer: Renderer2) {

    this.titleService.setTitle('My Profile - Find My Profession');
    const content: IProfile = route.snapshot.data['content'];

    if (content) {
      if (!content.questions) {
        content.questions = this.questionModel;
      }
      content.profile = ProfileUtilities.createProfileSection(content);
      this.profile = content;
    }

    this.accordionData = AccordionData;

    this.createUserSubscription();

    this.createReferenceMap();

    this.watchForProfileUpdate();

    this.resizeModeService.mode$
      .subscribe(
        (state: string) => this.isMobileMode = state === MODE_MOB
      );
  }

  public ngAfterViewInit() {
    const queryParams: any = this.route.snapshot.queryParams;
    if (queryParams.tab) {
      this.openAccordionPanel(queryParams.tab);
    }

    if (this.platformCheckService.isBrowser) {
      this.loadsGoogleScript();
    }
  }

  public ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.changeDetector.detach();
  }

  /**
   * Method to open progress reference
   * @param key
   */
  public openReference(key: string): void {
    const endpoint: IProgressReference = this.progressReferences.get(key);
    if (endpoint) {
      this.openField(endpoint);
    }
  }

  /**
   * Method watching for changes in profile update stream
   */
  private watchForProfileUpdate(): void {
    this.accordionService.profileUpdate$
      .filter((profile: ProfileUpdateEvent | null) => !!profile)
      .subscribe(
        (profile: ProfileUpdateEvent) => this.updateUserProfile(profile.profile, profile.activeId, profile.needClose)
      );
  }

  /**
   * Method to update profile
   * @param content
   * @param activeId
   * @param needClose
   */
  public updateUserProfile(content: IProfile, activeId?: string, needClose: boolean = true): void {
    content.profile = ProfileUtilities.createProfileSection(content);
    this.updateUserInfo(content);
    this.profile = content;
    if (needClose) {
      this.closeAccordion(true, activeId);
      this.scrollToTop();
    }
  }

  public closeAccordion(state: boolean, activeId: string = 'profile-accordion-1'): void {
    if (state && this.profileAccordion) {
      this.profileAccordion.toggle(activeId);
    }

    if (!state) {
      this.scrollToTop();
    }
  }

  public panelStateChanged(event: any): void {
    this.panelActiveId = event.panelId;
    this.accordionService.accordionState$.next({
      event: event,
      accordion: this.profileAccordion
    });
  }

  public documentTemplateSelected(): void {
    this.profile.templates = [];
  }

  /**
   * Update user info
   * @param {IProfile} profile
   */
  private updateUserInfo(profile: IProfile): void {
    const user: IUser = this.userService.user$.getValue();
    if (user) {
      user.full_name = profile.profile.full_name;
    }
    this.userService.user$.next(user);
  }

  /**
   * Method to subscribe to User stream
   */
  private createUserSubscription(): void {
    this.userService.user$
      .takeUntil(this.destroyed$)
      .filter((user: IUser) => !!user)
      .subscribe(
        (user: IUser) => this.user = user
      );
  }

  /**
   * Method to create reference map from array
   */
  private createReferenceMap(): void {
    this.progressReferences = new Map<string, IProgressReference>();

    PROGRESS_REFERENCES.forEach((element: IProgressReferenceEntity) => {
      if (element) {
        this.progressReferences.set(element.key, element.value);
      }
    });
  }

  private openField(event: IProgressReference): void {
    this.router.navigate(['/my-profile'], {queryParams: {tab: event.tabId}});

    this.changeDetector.detectChanges();

    this.openAccordionPanel(event.tabId);
  }

  private openAccordionPanel(panelId: string): void {
    if (this.panelActiveId !== panelId) {
      this.profileAccordion.toggle(panelId);
      this.panelActiveId = panelId;
      this.changeDetector.detectChanges();
    }
  }

  private scrollToTop(): void {
    if (this.platformService.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  private loadsGoogleScript(): void {
    if (window && !window['isGoogleScriptLoaded']) {
      const script: HTMLScriptElement = this.domRenderer.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBSPUsAXlKPjaLez0gPgOliUDX8ccJItH8';
      script.async = true;
      document.body.appendChild(script);
      window['isGoogleScriptLoaded'] = true;
    }
  }
}