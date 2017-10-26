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
import { ResizeModeService } from '../../../../../../core/services/resize-mode.service';
import { MODE_MOB } from '../../../../../../core/models/core.model';
import { Subject } from 'rxjs/Subject';
var CustomFileDropComponent = /** @class */ (function () {
    function CustomFileDropComponent(resizeService) {
        var _this = this;
        this.resizeService = resizeService;
        this.onFileUpload = new EventEmitter();
        this.fileIsOver = false;
        this.isMobileMode = false;
        this.isFileLoading = false;
        this.destroyed$ = new Subject();
        this.resizeService.mode$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isMobileMode = state === MODE_MOB; });
    }
    CustomFileDropComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    CustomFileDropComponent.prototype.fileOver = function (fileIsOver) {
        this.fileIsOver = fileIsOver;
    };
    CustomFileDropComponent.prototype.onFileDrop = function (file) {
        this.isFileLoading = true;
        this.onFileUpload.emit({
            file: file,
            close: this.fileUploaded,
            context: this
        });
    };
    CustomFileDropComponent.prototype.selectFile = function () {
        this.fileSelector.nativeElement.click();
    };
    CustomFileDropComponent.prototype.inputFileSelect = function ($event) {
        var fileList = $event.target.files;
        this.onFileDrop(fileList[0]);
    };
    CustomFileDropComponent.prototype.fileUploaded = function () {
        this.isFileLoading = false;
    };
    __decorate([
        ViewChild('fileSelector'),
        __metadata("design:type", Object)
    ], CustomFileDropComponent.prototype, "fileSelector", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], CustomFileDropComponent.prototype, "acceptFormats", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CustomFileDropComponent.prototype, "onFileUpload", void 0);
    CustomFileDropComponent = __decorate([
        Component({
            selector: 'fmp-custom-file-drop-component',
            templateUrl: 'custom-file-drop.html',
            styles: [require('./custom-file-drop.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ResizeModeService])
    ], CustomFileDropComponent);
    return CustomFileDropComponent;
}());
export { CustomFileDropComponent };
