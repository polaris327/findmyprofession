var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccordionData } from './user-profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileAccordionService } from './profile-accordion.service';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { PROGRESS_REFERENCES } from './profile-progress/profile-progress.model';
import { ProfileUtilities } from './profile-utilities.service';
import { UserService } from '../../../core/services/user.service';
import { PlatformCheckService } from '../../../core/services/platform-check.service';
import { ResizeModeService } from '../../../core/services/resize-mode.service';
import { MODE_MOB } from '../../../core/models/core.model';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
var UserProfileHolderComponent = /** @class */ (function () {
    function UserProfileHolderComponent(userService, accordionService, route, router, changeDetector, platformService, resizeModeService, titleService, platformCheckService, domRenderer) {
        var _this = this;
        this.userService = userService;
        this.accordionService = accordionService;
        this.route = route;
        this.router = router;
        this.changeDetector = changeDetector;
        this.platformService = platformService;
        this.resizeModeService = resizeModeService;
        this.titleService = titleService;
        this.platformCheckService = platformCheckService;
        this.domRenderer = domRenderer;
        this.panelActiveId = null;
        this.destroyed$ = new Subject();
        this.questionModel = {
            work_authorization: null,
            gender: null,
            veteran_status: null,
            disability_status: null,
            race_ethnicity: null
        };
        this.titleService.setTitle('My Profile - Find My Profession');
        var content = route.snapshot.data['content'];
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
            .subscribe(function (state) { return _this.isMobileMode = state === MODE_MOB; });
    }
    UserProfileHolderComponent.prototype.ngAfterViewInit = function () {
        var queryParams = this.route.snapshot.queryParams;
        if (queryParams.tab) {
            this.openAccordionPanel(queryParams.tab);
        }
        if (this.platformCheckService.isBrowser) {
            this.loadsGoogleScript();
        }
    };
    UserProfileHolderComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.changeDetector.detach();
    };
    /**
     * Method to open progress reference
     * @param key
     */
    UserProfileHolderComponent.prototype.openReference = function (key) {
        var endpoint = this.progressReferences.get(key);
        if (endpoint) {
            this.openField(endpoint);
        }
    };
    /**
     * Method watching for changes in profile update stream
     */
    UserProfileHolderComponent.prototype.watchForProfileUpdate = function () {
        var _this = this;
        this.accordionService.profileUpdate$
            .filter(function (profile) { return !!profile; })
            .subscribe(function (profile) { return _this.updateUserProfile(profile.profile, profile.activeId, profile.needClose); });
    };
    /**
     * Method to update profile
     * @param content
     * @param activeId
     * @param needClose
     */
    UserProfileHolderComponent.prototype.updateUserProfile = function (content, activeId, needClose) {
        if (needClose === void 0) { needClose = true; }
        content.profile = ProfileUtilities.createProfileSection(content);
        this.updateUserInfo(content);
        this.profile = content;
        if (needClose) {
            this.closeAccordion(true, activeId);
            this.scrollToTop();
        }
    };
    UserProfileHolderComponent.prototype.closeAccordion = function (state, activeId) {
        if (activeId === void 0) { activeId = 'profile-accordion-1'; }
        if (state && this.profileAccordion) {
            this.profileAccordion.toggle(activeId);
        }
        if (!state) {
            this.scrollToTop();
        }
    };
    UserProfileHolderComponent.prototype.panelStateChanged = function (event) {
        this.panelActiveId = event.panelId;
        this.accordionService.accordionState$.next({
            event: event,
            accordion: this.profileAccordion
        });
    };
    UserProfileHolderComponent.prototype.documentTemplateSelected = function () {
        this.profile.templates = [];
    };
    /**
     * Update user info
     * @param {IProfile} profile
     */
    UserProfileHolderComponent.prototype.updateUserInfo = function (profile) {
        var user = this.userService.user$.getValue();
        if (user) {
            user.full_name = profile.profile.full_name;
        }
        this.userService.user$.next(user);
    };
    /**
     * Method to subscribe to User stream
     */
    UserProfileHolderComponent.prototype.createUserSubscription = function () {
        var _this = this;
        this.userService.user$
            .takeUntil(this.destroyed$)
            .filter(function (user) { return !!user; })
            .subscribe(function (user) { return _this.user = user; });
    };
    /**
     * Method to create reference map from array
     */
    UserProfileHolderComponent.prototype.createReferenceMap = function () {
        var _this = this;
        this.progressReferences = new Map();
        PROGRESS_REFERENCES.forEach(function (element) {
            if (element) {
                _this.progressReferences.set(element.key, element.value);
            }
        });
    };
    UserProfileHolderComponent.prototype.openField = function (event) {
        this.router.navigate(['/my-profile'], { queryParams: { tab: event.tabId } });
        this.changeDetector.detectChanges();
        this.openAccordionPanel(event.tabId);
    };
    UserProfileHolderComponent.prototype.openAccordionPanel = function (panelId) {
        if (this.panelActiveId !== panelId) {
            this.profileAccordion.toggle(panelId);
            this.panelActiveId = panelId;
            this.changeDetector.detectChanges();
        }
    };
    UserProfileHolderComponent.prototype.scrollToTop = function () {
        if (this.platformService.isBrowser) {
            window.scrollTo(0, 0);
        }
    };
    UserProfileHolderComponent.prototype.loadsGoogleScript = function () {
        if (window && !window['isGoogleScriptLoaded']) {
            var script = this.domRenderer.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBSPUsAXlKPjaLez0gPgOliUDX8ccJItH8';
            script.async = true;
            document.body.appendChild(script);
            window['isGoogleScriptLoaded'] = true;
        }
    };
    __decorate([
        ViewChild('profileAccordion'),
        __metadata("design:type", NgbAccordion)
    ], UserProfileHolderComponent.prototype, "profileAccordion", void 0);
    UserProfileHolderComponent = __decorate([
        Component({
            selector: 'fmp-user-profile-holder',
            templateUrl: 'user-profile.html',
            styles: [require('./user-profile.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [UserService,
            ProfileAccordionService,
            ActivatedRoute,
            Router,
            ChangeDetectorRef,
            PlatformCheckService,
            ResizeModeService,
            Title,
            PlatformCheckService,
            Renderer2])
    ], UserProfileHolderComponent);
    return UserProfileHolderComponent;
}());
export { UserProfileHolderComponent };
