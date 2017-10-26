var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import { FileUploadPipe } from './pipes/backend-file';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AssetsPathPipe } from './pipes/assets-path.pipe';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SafePipe,
                FileUploadPipe,
                SafeHtmlPipe,
                AssetsPathPipe
            ],
            exports: [
                SafePipe,
                FileUploadPipe,
                SafeHtmlPipe,
                AssetsPathPipe
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
