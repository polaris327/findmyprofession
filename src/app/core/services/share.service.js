var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { ShareFacebookConfig } from '../models/facebook.config';
import { FacebookService } from 'ngx-facebook';
import { PlatformCheckService } from './platform-check.service';
import { DOMAIN_URL } from '../../../main.config';
var ShareLinkService = /** @class */ (function () {
    function ShareLinkService(faceBookService, platformService) {
        this.faceBookService = faceBookService;
        this.platformService = platformService;
        this.windowSettings = 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500';
    }
    ShareLinkService_1 = ShareLinkService;
    ShareLinkService.prototype.initFacebookConfig = function () {
        if (this.platformService.isBrowser) {
            this.faceBookService.init(ShareFacebookConfig);
        }
    };
    /**
     * Returns url of sharing video
     * @param type
     * @param id
     * @returns {string}
     */
    ShareLinkService.prototype.getShareUrl = function (type, id) {
        if (this.platformService.isBrowser) {
            var origin = window.location.origin;
            if (type === 'article') {
                return origin + "/career-advice/" + id;
            }
            return window.location.href;
        }
        return '';
    };
    /**
     * Open Twitter Sharing modal
     * @param type {feedback , profile}
     * @param id
     * @param text
     */
    ShareLinkService.prototype.shareToTwitter = function (type, id, text) {
        var url = this.getShareUrl(type, id);
        if (this.platformService.isBrowser) {
            var sharingUrl = "http://twitter.com/share?text=" + text + "&url=" + url;
            window.open(sharingUrl, 'targetWindow', this.windowSettings);
        }
    };
    /**
     * Open Facebook Sharing modal
     * @param type
     * @param id
     * @param description
     * @param image
     * @returns {Promise<any>}
     */
    ShareLinkService.prototype.shareToFacebook = function (type, id, description, image) {
        return this.faceBookService.ui({
            method: 'share',
            href: this.getShareUrl(type, id),
            description: description,
            picture: image
        });
    };
    /**
     *
     * @param url
     * @param title
     * @param description
     * @param image
     */
    ShareLinkService.prototype.shareToLinkedIn = function (url, title, description, image) {
        if (this.platformService.isBrowser) {
            url = "https://www.linkedin.com/shareArticle?mini=true&amp;url=" + (DOMAIN_URL + location.pathname);
            window.open(url, 'targetWindow', this.windowSettings);
        }
    };
    ShareLinkService.getMailShareLink = function (title, slug) {
        return "mailto:?&subject=" + title + "&body=" + ShareLinkService_1.getMailBody(slug);
    };
    /**
     * Method to get email body
     * @param {string} slug
     * @returns {string}
     */
    ShareLinkService.getMailBody = function (slug) {
        return "Just read this awesome article I thought I would share with you! Check it out here: " + DOMAIN_URL + "/career-advice/" + slug;
    };
    ShareLinkService = ShareLinkService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [FacebookService,
            PlatformCheckService])
    ], ShareLinkService);
    return ShareLinkService;
    var ShareLinkService_1;
}());
export { ShareLinkService };
