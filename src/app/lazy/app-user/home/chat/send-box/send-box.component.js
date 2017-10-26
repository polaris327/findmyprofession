var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ResizeModeService } from '../../../../../core/services/resize-mode.service';
import { MODE_MOB } from '../../../../../core/models/core.model';
import { Subject } from 'rxjs/Subject';
var FmpSendBoxComponent = /** @class */ (function () {
    function FmpSendBoxComponent(fb, resizeModeService) {
        this.fb = fb;
        this.resizeModeService = resizeModeService;
        this.maxSymbols = 500;
        this.isMessageSending = false;
        this.onMessageSend = new EventEmitter();
        this.isFileSelected = false;
        this.isMobileMode = false;
        this.destroyed$ = new Subject();
        /**
         * Form errors messages
         * @type {{required: string; minlength: string; maxlength: string}}
         */
        this.errorMessages = {
            required: "You must write something first",
            maxlength: "Message max length is " + this.maxSymbols
        };
        this.subscribeToResize();
        this.createForm();
    }
    FmpSendBoxComponent.prototype.ngOnChanges = function (changes) {
        var sending = changes['isMessageSending'];
        if (sending && this.modelForm) {
            if (sending.currentValue) {
                this.getModel().disable();
            }
            else {
                this.getModel().enable();
                if (this.sendField) {
                    this.sendField.nativeElement.focus();
                }
            }
        }
    };
    FmpSendBoxComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    FmpSendBoxComponent.prototype.keyPressed = function (keyEvent) {
        if (keyEvent.keyCode === 13 && !keyEvent.shiftKey) {
            if (!this.isMobileMode) {
                keyEvent.preventDefault();
                keyEvent.stopPropagation();
                this.sendMessage();
            }
        }
    };
    FmpSendBoxComponent.prototype.sendMessage = function () {
        var model = Object.assign(this.modelForm.value);
        var messageBody = model.message ? model.message.toString() : '';
        this.getModel().setValue(messageBody.trim());
        if (this.modelForm.valid) {
            this.onMessageSend.emit(Object.assign(this.modelForm.value));
            this.resetForm();
            this.sendField.nativeElement.focus();
        }
        else {
            this.showErrors();
        }
    };
    FmpSendBoxComponent.prototype.fileSelected = function (file) {
        if (file) {
            this.getModel().setValue(file.name);
            this.getModel('attachment').setValue(file);
            this.getModel().disable();
            this.isFileSelected = true;
            this.focusSubmitButton();
        }
    };
    FmpSendBoxComponent.prototype.fileRemoved = function () {
        this.resetForm();
    };
    FmpSendBoxComponent.prototype.showErrors = function () {
        var _this = this;
        Object.keys(this.getModel().errors)
            .forEach(function (key) { return _this.formError = _this.errorMessages[key]; });
    };
    FmpSendBoxComponent.prototype.resetForm = function () {
        this.fileName = null;
        this.isFileSelected = false;
        if (this.getModel().disabled) {
            this.getModel().enable();
        }
        this.modelForm.reset();
    };
    FmpSendBoxComponent.prototype.focusSubmitButton = function () {
        if (this.submitButton && this.submitButton.nativeElement) {
            this.submitButton.nativeElement.focus();
        }
    };
    FmpSendBoxComponent.prototype.subscribeToResize = function () {
        var _this = this;
        this.resizeModeService.mode$
            .takeUntil(this.destroyed$)
            .subscribe(function (mode) { return _this.isMobileMode = mode === MODE_MOB; });
    };
    FmpSendBoxComponent.prototype.createForm = function () {
        var _this = this;
        this.modelForm = this.buildModelForm();
        this.modelForm.valueChanges
            .subscribe(function () { return _this.formError = null; });
    };
    FmpSendBoxComponent.prototype.buildModelForm = function () {
        return this.fb.group({
            message: ['', [
                    Validators.required,
                    Validators.maxLength(this.maxSymbols)
                ]],
            attachment: []
        });
    };
    FmpSendBoxComponent.prototype.getModel = function (name) {
        if (name === void 0) { name = 'message'; }
        return this.modelForm.get(name);
    };
    __decorate([
        ViewChild('submitButton'),
        __metadata("design:type", Object)
    ], FmpSendBoxComponent.prototype, "submitButton", void 0);
    __decorate([
        ViewChild('sendField'),
        __metadata("design:type", ElementRef)
    ], FmpSendBoxComponent.prototype, "sendField", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FmpSendBoxComponent.prototype, "maxSymbols", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FmpSendBoxComponent.prototype, "isMessageSending", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FmpSendBoxComponent.prototype, "onMessageSend", void 0);
    FmpSendBoxComponent = __decorate([
        Component({
            selector: 'fmp-send-box-component',
            templateUrl: 'send-box.html',
            styles: [require('./send-box.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ResizeModeService])
    ], FmpSendBoxComponent);
    return FmpSendBoxComponent;
}());
export { FmpSendBoxComponent };
