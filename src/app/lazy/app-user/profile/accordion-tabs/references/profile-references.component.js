var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserProfileService } from '../../user-profile.service';
import { ProfileTabMode } from '../../user-profile.model';
var ProfileReferenceComponent = /** @class */ (function () {
    function ProfileReferenceComponent(profileService) {
        this.profileService = profileService;
        this.onProfileUpdate = new EventEmitter();
        this.reference = {
            name: '',
            job_title: '',
            company: '',
            email: '',
            phone_number: '',
            relationship: ''
        };
        this.referenceList = {
            existing: [],
            creating: []
        };
    }
    ProfileReferenceComponent.prototype.ngOnChanges = function () {
        if (Array.isArray(this.references)) {
            this.referenceList.existing = this.references.map(function (reference) {
                return {
                    item: reference,
                    mode: ProfileTabMode.VIEW
                };
            });
        }
    };
    ProfileReferenceComponent.prototype.removeReference = function (itemId, itemIndex, mode) {
        var _this = this;
        if (mode === ProfileTabMode.CREATE) {
            this.referenceList.creating.splice(0, 1);
        }
        else {
            this.profileService.removeReference(itemId)
                .subscribe(function () { return _this.removeReferenceFromList(itemIndex); }, this.handleError.bind(this));
        }
    };
    ProfileReferenceComponent.prototype.removeReferenceFromList = function (itemIndex) {
        this.referenceList.existing.splice(itemIndex, 1);
    };
    ProfileReferenceComponent.prototype.updateReference = function (reference, item) {
        var _this = this;
        this.profileService.updateReference(reference)
            .subscribe(function (profile) {
            item.mode = ProfileTabMode.VIEW;
            _this.onProfileUpdate.emit(profile);
        }, this.handleError.bind(this));
    };
    ProfileReferenceComponent.prototype.itemEditStart = function (mode, item) {
        item.mode = mode;
    };
    ProfileReferenceComponent.prototype.addReference = function () {
        if (this.referenceList.creating && this.referenceList.existing) {
            var list = this.referenceList.creating;
            this.referenceList.existing.forEach(function (item) {
                item.mode = ProfileTabMode.VIEW;
            });
            if (Array.isArray(list) && list.length === 0) {
                this.referenceList.creating.push(Object.assign({}, this.reference));
            }
        }
    };
    ProfileReferenceComponent.prototype.createItem = function (item) {
        var _this = this;
        if (this.referenceList.creating && this.referenceList.existing) {
            this.clearError();
            this.profileService.createReference(item)
                .subscribe(function (response) { return _this.createItemHandler(response); }, this.handleError.bind(this));
        }
    };
    ProfileReferenceComponent.prototype.createItemHandler = function (response) {
        this.referenceList.creating = [];
        this.onProfileUpdate.emit(response);
    };
    ProfileReferenceComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    ProfileReferenceComponent.prototype.clearError = function () {
        this.errorMessage = '';
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ProfileReferenceComponent.prototype, "references", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ProfileReferenceComponent.prototype, "onProfileUpdate", void 0);
    ProfileReferenceComponent = __decorate([
        Component({
            selector: 'fmp-profile-reference-component',
            templateUrl: 'profile-references.html'
        }),
        __metadata("design:paramtypes", [UserProfileService])
    ], ProfileReferenceComponent);
    return ProfileReferenceComponent;
}());
export { ProfileReferenceComponent };
