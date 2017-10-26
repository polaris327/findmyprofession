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
var DocumentTableComponent = /** @class */ (function () {
    function DocumentTableComponent() {
        this.onDocumentRemove = new EventEmitter();
        this.onDocumentUpdate = new EventEmitter();
        this.onDocumentDownload = new EventEmitter();
    }
    /**
     * Remove document
     * @param document
     */
    DocumentTableComponent.prototype.removeDocument = function (document) {
        this.onDocumentRemove.emit(document);
    };
    /**
     * Change document type
     * @param type
     * @param doc
     */
    DocumentTableComponent.prototype.documentTypeChanged = function (type, doc) {
        /*Action*/
        doc.type = type;
        this.onDocumentUpdate.emit(doc);
    };
    DocumentTableComponent.prototype.downloadDocument = function ($event, doc) {
        $event.preventDefault();
        this.onDocumentDownload.emit({
            link: doc.document,
            name: doc.name
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DocumentTableComponent.prototype, "documents", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DocumentTableComponent.prototype, "documentTypes", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DocumentTableComponent.prototype, "onDocumentRemove", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DocumentTableComponent.prototype, "onDocumentUpdate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DocumentTableComponent.prototype, "onDocumentDownload", void 0);
    DocumentTableComponent = __decorate([
        Component({
            selector: 'fmp-document-table-component',
            templateUrl: 'document-table.html',
            styles: [require('./document-table.scss').toString()],
            encapsulation: ViewEncapsulation.None
        })
    ], DocumentTableComponent);
    return DocumentTableComponent;
}());
export { DocumentTableComponent };
