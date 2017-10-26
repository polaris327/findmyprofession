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
import { Meta, Title } from '@angular/platform-browser';
import { FileUploadPipe } from '../../shared/pipes/backend-file';
/**
 * Service to update meta tags
 */
var MetaTags = /** @class */ (function () {
    function MetaTags(metaService, titleService) {
        this.metaService = metaService;
        this.titleService = titleService;
        this.helpTags = [
            'og:locale',
            'og:type',
            'og:url',
            'og:site_name',
            'twitter:card'
        ];
        this.titleTagas = [
            'title',
            'og:title',
            'twitter:title'
        ];
        this.descriptionTags = [
            'description',
            'og:description',
            'twitter:description'
        ];
        this.imageTags = [
            'og:image',
            'twitter:image'
        ];
    }
    MetaTags.prototype.setTags = function (tags) {
        if (tags) {
            for (var key in tags) {
                if (tags.hasOwnProperty(key)) {
                    this.metaService.updateTag({
                        name: key,
                        content: tags[key]
                    }, "name=\"" + key + "\"");
                }
            }
        }
    };
    /**
     * Method to remove tag by it's name
     * @param {string} tagName
     */
    MetaTags.prototype.removeTag = function (tagName) {
        if (tagName) {
            var tagProperty = tagName.includes('og:') ? 'property' : 'name';
            this.metaService.removeTag(tagProperty + "='" + tagName + "'");
        }
    };
    MetaTags.prototype.removeImageTags = function () {
        this.removeTagsArray(this.imageTags);
    };
    MetaTags.prototype.removeTitleTags = function () {
        this.removeTagsArray(this.titleTagas);
    };
    MetaTags.prototype.removeDescriptionTags = function () {
        this.removeTagsArray(this.descriptionTags);
    };
    MetaTags.prototype.removeHelpTags = function () {
        this.removeTagsArray(this.helpTags);
    };
    MetaTags.prototype.removeAllMetaTags = function () {
        this.removeImageTags();
        this.removeTitleTags();
        this.removeDescriptionTags();
        this.removeHelpTags();
    };
    MetaTags.prototype.setMetaTags = function (page) {
        var pipe = new FileUploadPipe();
        var image = page.image;
        if (image) {
            image = pipe.transform(image);
            this.setImages(image);
        }
        else {
            this.removeImageTags();
        }
        this.setTitles(page.seo_title);
        this.setDescription(page.description);
        this.setTitle(page.title);
    };
    /**
     * Method to set og:url
     * @param {string} url
     */
    MetaTags.prototype.setUrl = function (url) {
        if (url) {
            this.metaService.updateTag({
                property: 'og:url',
                content: url
            }, "property=\"og:url\"");
        }
    };
    MetaTags.prototype.setImages = function (image) {
        image ? this._setTags(image, this.imageTags) : this.removeImageTags();
    };
    MetaTags.prototype.setTitles = function (title) {
        title ? this._setTags(title, this.titleTagas) : this.removeTitleTags();
    };
    MetaTags.prototype.setDescription = function (description) {
        description ? this._setTags(description, this.descriptionTags) : this.removeDescriptionTags();
    };
    MetaTags.prototype.setTitle = function (title) {
        if (title) {
            title = title.replace(/\&amp;/g, '&');
            this.titleService.setTitle(decodeURI(title));
        }
    };
    MetaTags.prototype.removeTagsArray = function (tags) {
        var _this = this;
        tags.forEach(function (tagName) { return _this.removeTag(tagName); });
    };
    MetaTags.prototype._setTags = function (value, tags) {
        var _this = this;
        if (value && Array.isArray(tags)) {
            tags.forEach(function (tag) {
                if (tag && tag.includes('og:')) {
                    _this.metaService.updateTag({
                        property: tag,
                        content: value
                    }, "property=\"" + tag + "\"");
                }
                else {
                    _this.metaService.updateTag({
                        name: tag,
                        content: value
                    }, "name=\"" + tag + "\"");
                }
            });
        }
    };
    MetaTags = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Meta,
            Title])
    ], MetaTags);
    return MetaTags;
}());
export { MetaTags };
