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
import { ShareLinkService } from '../../../core/services/share.service';
import { PlatformCheckService } from '../../../core/services/platform-check.service';
var ShareLinksComponent = /** @class */ (function () {
    function ShareLinksComponent(shareLinksService, domRenderer, platformCheckService) {
        this.shareLinksService = shareLinksService;
        this.domRenderer = domRenderer;
        this.platformCheckService = platformCheckService;
    }
    ShareLinksComponent.prototype.ngOnChanges = function (changes) {
        var articleUrl = changes['articleUrl'];
        if (articleUrl && articleUrl.currentValue) {
            this.shareLink = this.shareLinksService.getShareUrl('article', this.articleUrl);
        }
        var articleTitle = changes['articleUrl'];
        if (articleUrl && articleTitle && articleUrl.currentValue && articleTitle.currentValue) {
            this.mailBodyLink = ShareLinkService.getMailShareLink(this.articleTitle, this.articleUrl);
        }
    };
    ShareLinksComponent.prototype.ngOnInit = function () {
        if (this.platformCheckService.isBrowser) {
            this.loadFacebookSdkScript();
        }
    };
    ShareLinksComponent.prototype.shareToFacebook = function () {
        var _this = this;
        this.shareLinksService.shareToFacebook('article', this.articleUrl, this.articleDescription, this.articleImageUrl)
            .then(function () { }, function (error) { return _this.errorMessage = error; });
    };
    ShareLinksComponent.prototype.shareToTwitter = function () {
        this.shareLinksService.shareToTwitter('article', this.articleUrl, this.articleTitle);
    };
    ShareLinksComponent.prototype.shareToLinkedIn = function () {
        this.shareLinksService.shareToLinkedIn(this.articleUrl, this.articleTitle, this.articleDescription, this.articleImageUrl);
    };
    ShareLinksComponent.prototype.loadFacebookSdkScript = function () {
        var _this = this;
        if (window && !window['facebookSdkLoaded']) {
            var script = this.domRenderer.createElement('script');
            script.src = 'https://connect.facebook.net/en_US/sdk.js';
            script.async = false;
            script.onload = function () {
                _this.initConfig();
            };
            document.body.appendChild(script);
            window['facebookSdkLoaded'] = true;
        }
        else {
            this.initConfig();
        }
    };
    ShareLinksComponent.prototype.initConfig = function () {
        this.shareLinksService.initFacebookConfig();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShareLinksComponent.prototype, "articleUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShareLinksComponent.prototype, "articleImageUrl", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShareLinksComponent.prototype, "articleTitle", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShareLinksComponent.prototype, "articleDescription", void 0);
    ShareLinksComponent = __decorate([
        Component({
            selector: 'fmp-article-share-links-component',
            templateUrl: 'share-links.component.html',
            styles: [require('./share-links.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ShareLinkService,
            Renderer2,
            PlatformCheckService])
    ], ShareLinksComponent);
    return ShareLinksComponent;
}());
export { ShareLinksComponent };
