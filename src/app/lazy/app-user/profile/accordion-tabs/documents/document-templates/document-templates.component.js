var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
var DocumentTemplatesComponent = /** @class */ (function () {
    function DocumentTemplatesComponent() {
        this.onTemplateSelect = new EventEmitter();
        this.onTemplatePreview = new EventEmitter();
    }
    DocumentTemplatesComponent.prototype.selectTemplate = function (template) {
        this.onTemplateSelect.emit(template);
    };
    DocumentTemplatesComponent.prototype.seeTemplatePreview = function (template) {
        this.onTemplatePreview.emit(template.preview);
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DocumentTemplatesComponent.prototype, "templates", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DocumentTemplatesComponent.prototype, "onTemplateSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DocumentTemplatesComponent.prototype, "onTemplatePreview", void 0);
    DocumentTemplatesComponent = __decorate([
        Component({
            selector: 'fmp-document-templates-component',
            templateUrl: 'document-templates.html',
            styles: [require('./document-templates.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], DocumentTemplatesComponent);
    return DocumentTemplatesComponent;
}());
export { DocumentTemplatesComponent };
