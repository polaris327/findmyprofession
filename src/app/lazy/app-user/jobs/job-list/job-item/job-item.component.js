var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreUtilitiesService } from '../../../../../core/services/core-utilities.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../../../../modules/alert-modal/alert-modal.component';
import { PlatformCheckService } from '../../../../../core/services/platform-check.service';
require('../../../../../../assets/images/logo-company.png');
var JobItemComponent = /** @class */ (function () {
    function JobItemComponent(modalService, platformCheck) {
        this.modalService = modalService;
        this.platformCheck = platformCheck;
        this.onFileUpload = new EventEmitter();
        this.onStatusChanged = new EventEmitter();
        this.onJobRemove = new EventEmitter();
        this.onApplyStateChanged = new EventEmitter();
        this.onFileSelected = new EventEmitter();
        this.onCoverLetterRemove = new EventEmitter();
        this.defaultIcon = 'src/assets/images/logo-company.png';
        this.acceptFormats = CoreUtilitiesService.fileAcceptFormats;
    }
    JobItemComponent.prototype.ngOnChanges = function (changes) {
        var item = changes['item'];
        if (item && item.currentValue) {
            this.item.linkForAvatar = CoreUtilitiesService.parseJobLink(this.item.link);
        }
    };
    /**
     * Method to log error if img not loaded
     * @param event
     */
    JobItemComponent.prototype.logoError = function (event) {
        if (event.target) {
            event.target.src = this.defaultIcon;
        }
    };
    JobItemComponent.prototype.applyStatusChanged = function (event) {
        this.onApplyStateChanged.emit({
            id: this.item.id,
            state: event.target['checked'],
            event: event,
            item: this.item
        });
    };
    JobItemComponent.prototype.statusChanged = function (status) {
        this.onStatusChanged.emit(status);
    };
    JobItemComponent.prototype.downloadAttachment = function (jobItem, $event) {
        $event.preventDefault();
        this.onFileUpload.emit({
            link: jobItem.attachment,
            fileName: jobItem.attachment_name
        });
    };
    JobItemComponent.prototype.removeJob = function (job) {
        this.onJobRemove.emit(job);
    };
    JobItemComponent.prototype.uploadCoverLetterClick = function () {
        this.uploadCoverSelector.nativeElement.click();
    };
    JobItemComponent.prototype.uploadCoverLetter = function ($event) {
        var fileList = $event.target.files;
        if (fileList[0]) {
            var file = fileList[0];
            var isFormatValid = CoreUtilitiesService.checkFileExtension(file);
            if (!isFormatValid) {
                var modalRef = this.modalService.open(AlertModalComponent);
                modalRef.componentInstance.showButtons = false;
                modalRef.componentInstance.message = "File you want upload has unsupported format. Please select another. Accept formats: " + this.acceptFormats.join(' ; ');
            }
            else {
                this.onFileSelected.emit(file);
            }
        }
    };
    JobItemComponent.prototype.removeCoverLetter = function (item) {
        this.onCoverLetterRemove.emit(item);
    };
    JobItemComponent.prototype.openCompanyLink = function (link) {
        if (this.platformCheck.isBrowser) {
            window.open(link, '_blank');
        }
    };
    __decorate([
        ViewChild('uploadCover'),
        __metadata("design:type", Object)
    ], JobItemComponent.prototype, "uploadCoverSelector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], JobItemComponent.prototype, "item", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], JobItemComponent.prototype, "statuses", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobItemComponent.prototype, "onFileUpload", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobItemComponent.prototype, "onStatusChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobItemComponent.prototype, "onJobRemove", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobItemComponent.prototype, "onApplyStateChanged", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobItemComponent.prototype, "onFileSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], JobItemComponent.prototype, "onCoverLetterRemove", void 0);
    JobItemComponent = __decorate([
        Component({
            selector: 'fmp-job-item-component',
            templateUrl: 'job-item.html',
            styles: [require('./job-item.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [NgbModal,
            PlatformCheckService])
    ], JobItemComponent);
    return JobItemComponent;
}());
export { JobItemComponent };
