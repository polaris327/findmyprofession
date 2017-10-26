var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewEncapsulation } from '@angular/core';
import { UserFavoriteArticlesService } from './user-favourite-articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Title } from '@angular/platform-browser';
import { CoreUtilitiesService } from '../../../core/services/core-utilities.service';
import { Subject } from 'rxjs/Subject';
var UserFavoriteArticlesComponent = /** @class */ (function () {
    function UserFavoriteArticlesComponent(articlesService, route, router, userService, titleService, coreUtilities) {
        this.articlesService = articlesService;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.titleService = titleService;
        this.coreUtilities = coreUtilities;
        this.currentPage = 1;
        this.defaultLimit = 9;
        this.collectionSize = 0;
        this.isAuth = false;
        this.destroyed$ = new Subject();
        this.titleService.setTitle('My Favorite Articles - Find My Profession');
        this.authSubscription();
    }
    UserFavoriteArticlesComponent.prototype.ngOnInit = function () {
        this.subscribeToParams();
    };
    UserFavoriteArticlesComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    UserFavoriteArticlesComponent.prototype.pageSelected = function () {
        if (this.currentPage === 1) {
            this.router.navigate(['/my-favorite-articles']);
        }
        else {
            this.router.navigate(['/my-favorite-articles'], { queryParams: { page: this.currentPage } });
        }
    };
    UserFavoriteArticlesComponent.prototype.openArticle = function ($event) {
        if ($event.newTab) {
            this.coreUtilities.openArticleInNewTab($event.url);
        }
        else {
            this.router.navigate(['/career-advice', $event.url]);
        }
    };
    UserFavoriteArticlesComponent.prototype.likedStatusChanged = function (event) {
        var _this = this;
        this.articlesService.unLikeArticle(event.id)
            .subscribe(function () { return _this.loadArticles(); });
    };
    UserFavoriteArticlesComponent.prototype.subscribeToParams = function () {
        var _this = this;
        this.route.queryParams
            .do(function (params) { return _this.checkForDefaultPage(!params.page); })
            .filter(function (params) { return params.page; })
            .map(function (params) { return +params.page; })
            .filter(function (page) { return !Number.isNaN(page); })
            .subscribe(function (page) {
            _this.currentPage = page;
            _this.loadArticles();
        });
    };
    UserFavoriteArticlesComponent.prototype.loadArticles = function () {
        var _this = this;
        this.articlesService.getArticles(this.currentPage)
            .subscribe(function (response) {
            _this.collectionSize = _this.defaultLimit * response.pages;
            _this.articles = response.likes;
        });
    };
    UserFavoriteArticlesComponent.prototype.checkForDefaultPage = function (needLoad) {
        if (needLoad) {
            this.loadArticles();
        }
    };
    UserFavoriteArticlesComponent.prototype.authSubscription = function () {
        var _this = this;
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isAuth = state; });
    };
    UserFavoriteArticlesComponent = __decorate([
        Component({
            selector: 'fmp-user-favorite-articles-layout',
            templateUrl: 'user-favorite-articles.html',
            styles: [require('./user-favorite-articles.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [UserFavoriteArticlesService,
            ActivatedRoute,
            Router,
            UserService,
            Title,
            CoreUtilitiesService])
    ], UserFavoriteArticlesComponent);
    return UserFavoriteArticlesComponent;
}());
export { UserFavoriteArticlesComponent };
