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
import { HttpService } from '../../../core/services/http.service';
import { FAVORITES_ARTICLES } from '../../../core/models/api-urls.model';
var UserFavoriteArticlesService = /** @class */ (function () {
    function UserFavoriteArticlesService(http) {
        this.http = http;
    }
    UserFavoriteArticlesService.prototype.getArticles = function (page) {
        var request = {
            url: FAVORITES_ARTICLES,
            userToken: true,
            searchParams: { page: page }
        };
        return this.http.sendRequest(request);
    };
    UserFavoriteArticlesService.prototype.likeArticle = function (id) {
        var request = {
            method: 'PUT',
            url: FAVORITES_ARTICLES + "/" + id,
            userToken: true
        };
        return this.http.sendRequest(request);
    };
    UserFavoriteArticlesService.prototype.unLikeArticle = function (id) {
        var request = {
            method: 'DELETE',
            url: FAVORITES_ARTICLES + "/" + id,
            userToken: true
        };
        return this.http.sendRequest(request);
    };
    UserFavoriteArticlesService.prototype.isArticleLiked = function (id) {
        var request = {
            url: FAVORITES_ARTICLES + "/" + id,
            userToken: true
        };
        return this.http.sendRequest(request);
    };
    /**
     * Method to check if articles liked for user
     * @param articlesIds
     * @returns {Observable<any>}
     */
    UserFavoriteArticlesService.prototype.checkIfArticlesLiked = function (articlesIds) {
        var request = {
            method: 'POST',
            url: "/favorites/blog-likes",
            userToken: true,
            body: {
                blog: articlesIds
            }
        };
        return this.http.sendRequest(request);
    };
    UserFavoriteArticlesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpService])
    ], UserFavoriteArticlesService);
    return UserFavoriteArticlesService;
}());
export { UserFavoriteArticlesService };
