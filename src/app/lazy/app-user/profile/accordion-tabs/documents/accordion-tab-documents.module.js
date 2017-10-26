var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFileDropModule } from './custom-file-drop/custom-file-drop.module';
import { AccordionTabDocumentsComponent } from './accordion-tab-documents-component';
import { DocumentTableComponent } from './document-table/document-table.component';
import { DocumentTemplatesComponent } from './document-templates/document-templates.component';
import { CustomDropdownModule } from '../../../../../modules/custom-dropdown/custom-dropdown.module';
import { SharedModule } from '../../../../../shared/shared.module';
var AccordionTabDocumentModule = /** @class */ (function () {
    function AccordionTabDocumentModule() {
    }
    AccordionTabDocumentModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                CustomFileDropModule,
                CustomDropdownModule,
                SharedModule
            ],
            declarations: [
                AccordionTabDocumentsComponent,
                DocumentTableComponent,
                DocumentTemplatesComponent
            ],
            exports: [
                AccordionTabDocumentsComponent
            ]
        })
    ], AccordionTabDocumentModule);
    return AccordionTabDocumentModule;
}());
export { AccordionTabDocumentModule };
