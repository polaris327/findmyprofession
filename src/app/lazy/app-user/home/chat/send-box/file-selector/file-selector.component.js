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
import { CoreUtilitiesService } from '../../../../../../core/services/core-utilities.service';
import { AlertModalComponent } from '../../../../../../modules/alert-modal/alert-modal.component';
var FmpFileSelectorComponent = /** @class */ (function () {
    function FmpFileSelectorComponent(modalService) {
        this.modalService = modalService;
        this.isSelected = false;
        this.isDisabled = false;
        this.onFileSelected = new EventEmitter();
        this.onFileRemoved = new EventEmitter();
        this.acceptFormats = CoreUtilitiesService.fileAcceptFormats;
    }
    FmpFileSelectorComponent.prototype.attachFile = function () {
        if (this.isSelected) {
            this.onFileRemoved.emit();
        }
        else {
            this.fileSelector.nativeElement.click();
        }
    };
    FmpFileSelectorComponent.prototype.fileSelected = function ($event) {
        var fileList = $event.target.files;
        if (fileList[0]) {
            var file = fileList[0];
            $event.target.value = null;
            var isFormatValid = CoreUtilitiesService.checkFileExtension(file);
            if (!isFormatValid) {
                var modalRef = this.modalService.open(AlertModalComponent);
                modalRef.result
                    .then(function () { }, function () { });
                modalRef.componentInstance.showButtons = false;
                modalRef.componentInstance.message = "File you want upload has unsupported format. Please select another. Accept formats: " + this.acceptFormats.join(' ; ');
            }
            else {
                this.onFileSelected.emit(file);
            }
        }
    };
    __decorate([
        ViewChild('fileSelector'),
        __metadata("design:type", Object)
    ], FmpFileSelectorComponent.prototype, "fileSelector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FmpFileSelectorComponent.prototype, "fileName", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FmpFileSelectorComponent.prototype, "isSelected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FmpFileSelectorComponent.prototype, "isDisabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FmpFileSelectorComponent.prototype, "onFileSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FmpFileSelectorComponent.prototype, "onFileRemoved", void 0);
    FmpFileSelectorComponent = __decorate([
        Component({
            selector: 'fmp-file-selector-component',
            templateUrl: 'file-selector.html'
        }),
        __metadata("design:paramtypes", [NgbModal])
    ], FmpFileSelectorComponent);
    return FmpFileSelectorComponent;
}());
export { FmpFileSelectorComponent };
