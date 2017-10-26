var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from '../../user-profile.service';
import { TemplatePreviewModalComponent } from './template-preview-modal/template-preview-modal.component';
import { AlertModalComponent } from '../../../../../modules/alert-modal/alert-modal.component';
import { CoreUtilitiesService } from '../../../../../core/services/core-utilities.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploadPipe } from '../../../../../shared/pipes/backend-file';
var AccordionTabDocumentsComponent = /** @class */ (function () {
    function AccordionTabDocumentsComponent(profileService, modalService, route) {
        this.profileService = profileService;
        this.modalService = modalService;
        this.route = route;
        this.onFileUploaded = new EventEmitter();
        this.onTemplateSelected = new EventEmitter();
        this.fileAcceptFormats = [];
        /**
         * Document types
         * @type {[string,string,string]}
         */
        this.documentTypes = [
            'Resume',
            'Cover letter',
            'Other'
        ];
        this.fileAcceptFormats = CoreUtilitiesService.fileAcceptFormats;
    }
    AccordionTabDocumentsComponent.prototype.ngAfterViewInit = function () {
        var query = this.route.snapshot.queryParams;
        if (query && query.tab) {
            this.point.nativeElement.scrollIntoView(false);
        }
    };
    /**
     * Method to upload file to server
     * @param event
     */
    AccordionTabDocumentsComponent.prototype.onFileUpload = function (event) {
        var _this = this;
        var isFormatValid = CoreUtilitiesService.checkFileExtension(event.file);
        if (!isFormatValid) {
            var modalRef = this.modalService.open(AlertModalComponent);
            modalRef.componentInstance.showButtons = false;
            modalRef.componentInstance.message = "File you want upload has unsupported format. Please select another. Accept formats: " + this.fileAcceptFormats.join(' ; ');
        }
        else {
            this.profileService.uploadDocument(event.file)
                .subscribe(function (response) {
                event.close.call(event.context);
                _this.onFileUploaded.emit(response);
            }, function (error) {
                event.close.call(event.context);
                _this.handleError(error);
            });
        }
    };
    /**
     * Method to remove document by id
     * @param doc
     */
    AccordionTabDocumentsComponent.prototype.removeDocument = function (doc) {
        if (doc) {
            var message = "Are you sure you want to permanently delete (" + doc.name + ")?";
            this.openModal(message, this.removeDocumentCallback.bind(this, doc), 'Wait');
        }
    };
    /**
     * Callback for remove document
     * @param doc
     */
    AccordionTabDocumentsComponent.prototype.removeDocumentCallback = function (doc) {
        var _this = this;
        this.profileService.removeDocument(doc.id)
            .subscribe(function (profile) { return _this.onFileUploaded.emit(profile); }, function (error) { return _this.handleError(error); });
    };
    /**
     * Update document type
     * @param doc
     */
    AccordionTabDocumentsComponent.prototype.updateDocument = function (doc) {
        var _this = this;
        this.profileService.updateDocument(doc)
            .subscribe(function (profile) { return _this.onFileUploaded.emit(profile); }, function (error) { return _this.handleError(error); });
    };
    /**
     * Method to select existing template
     * @param template
     */
    AccordionTabDocumentsComponent.prototype.selectDocumentTemplate = function (template) {
        var message = 'Are you sure this is the resume template you want? Once you confirm you cannot go back.';
        this.openModal(message, this.selectDocumentTemplateCallback.bind(this, template), 'Warning');
    };
    AccordionTabDocumentsComponent.prototype.downloadDocument = function (object) {
        this.profileService.downloadFile(object.link)
            .subscribe(function (data) { return CoreUtilitiesService.saveFile(data, object.name); });
    };
    /**
     * Callback for select document template
     * @param template
     */
    AccordionTabDocumentsComponent.prototype.selectDocumentTemplateCallback = function (template) {
        var _this = this;
        /**
         * Downloading specific document template
         */
        var pathPipe = new FileUploadPipe();
        var path = pathPipe.transform(template.template);
        this.profileService.downloadFile(path)
            .subscribe(function (data) {
            CoreUtilitiesService.saveFile(data, template.name);
            _this.onTemplateSelected.emit();
        });
    };
    /**
     * Method to open modal and trigger callback
     * @param message
     * @param callback
     * @param title
     */
    AccordionTabDocumentsComponent.prototype.openModal = function (message, callback, title) {
        var modal = this.modalService.open(AlertModalComponent, {
            backdrop: false
        });
        modal.result.then(function () {
            callback();
        }, function () { });
        modal.componentInstance.title = title;
        modal.componentInstance.message = message;
    };
    AccordionTabDocumentsComponent.prototype.openPreview = function (link) {
        var modal = this.modalService.open(TemplatePreviewModalComponent);
        modal.componentInstance.preview = link;
    };
    /**
     * Method to handle error
     * @param error
     */
    AccordionTabDocumentsComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    __decorate([
        ViewChild('point'),
        __metadata("design:type", Object)
    ], AccordionTabDocumentsComponent.prototype, "point", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AccordionTabDocumentsComponent.prototype, "documents", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AccordionTabDocumentsComponent.prototype, "templates", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTabDocumentsComponent.prototype, "onFileUploaded", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AccordionTabDocumentsComponent.prototype, "onTemplateSelected", void 0);
    AccordionTabDocumentsComponent = __decorate([
        Component({
            selector: 'fmp-accordion-tab-documents',
            templateUrl: 'accordion-tab-documents.html'
        }),
        __metadata("design:paramtypes", [UserProfileService,
            NgbModal,
            ActivatedRoute])
    ], AccordionTabDocumentsComponent);
    return AccordionTabDocumentsComponent;
}());
export { AccordionTabDocumentsComponent };
