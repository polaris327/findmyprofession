var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { APP_CONFIG } from '../../core/models/app.config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreUtilitiesService } from '../../core/services/core-utilities.service';
import { PlatformCheckService } from '../../core/services/platform-check.service';
var CalendlyComponent = /** @class */ (function () {
    function CalendlyComponent(activeModal, utilitiesService, platformCheckService, domRenderer) {
        this.activeModal = activeModal;
        this.utilitiesService = utilitiesService;
        this.platformCheckService = platformCheckService;
        this.domRenderer = domRenderer;
        this.isFrameLoaded = false;
        this.counter = 0;
        this.calendlyUrl = APP_CONFIG.calendly_url;
        if (utilitiesService.detectEdge() || utilitiesService.detectFirefox()) {
            this.openFrame();
        }
    }
    CalendlyComponent.prototype.ngOnInit = function () {
        if (this.platformCheckService.isBrowser) {
            this.loadCalendlyScript();
        }
    };
    CalendlyComponent.prototype.frameLoaded = function () {
        if (this.counter == 1) {
            this.counter = 0;
            this.isFrameLoaded = true;
        }
        else {
            this.counter = 1;
        }
    };
    CalendlyComponent.prototype.cancel = function () {
        this.activeModal.dismiss('Cancel close');
    };
    CalendlyComponent.prototype.openFrame = function () {
        var _this = this;
        setTimeout(function () {
            _this.isFrameLoaded = true;
        }, 1000);
    };
    CalendlyComponent.prototype.loadCalendlyScript = function () {
        if (window && !window['isCalendlyScriptLoaded']) {
            var script = this.domRenderer.createElement('script');
            script.src = 'https://calendly.com/assets/external/widget.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            window['isCalendlyScriptLoaded'] = true;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CalendlyComponent.prototype, "type", void 0);
    CalendlyComponent = __decorate([
        Component({
            selector: 'fmp-calendly-component',
            templateUrl: 'calendly.component.html',
            styles: [require('./calendly.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [NgbActiveModal,
            CoreUtilitiesService,
            PlatformCheckService,
            Renderer2])
    ], CalendlyComponent);
    return CalendlyComponent;
}());
export { CalendlyComponent };
