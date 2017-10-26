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
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TransferHttp } from '../../../modules/transfer-http/transfer-http';
import { ARTICLES } from '../../core/models/api-urls.model';
import { BlogArticleComponent } from './blog-article.component';
/**
 * Service to get data before home page is loaded
 */
var BlogArticleDataResolver = /** @class */ (function () {
    function BlogArticleDataResolver(http, router) {
        this.http = http;
        this.router = router;
    }
    /**
     * Method to get page data
     * @param snapshot
     * @returns {Observable<IBlogArticle>}
     */
    BlogArticleDataResolver.prototype.resolve = function (snapshot) {
        var _this = this;
        if (BlogArticleComponent.inited) {
            return Observable.of(null);
        }
        var url = TransferHttp.getUrl(ARTICLES + "/" + snapshot.params['title'], true);
        return this.http.get(url)
            .catch(function () {
            _this.router.navigate(['/career-advice']);
            return Observable.of(null);
        });
    };
    BlogArticleDataResolver = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [TransferHttp,
            Router])
    ], BlogArticleDataResolver);
    return BlogArticleDataResolver;
}());
export { BlogArticleDataResolver };
