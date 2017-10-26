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
import { ActivatedRoute, Router } from '@angular/router';
import { UserCareerAdviceService } from './app-career-advice.service';
import { UserFavoriteArticlesService } from '../favorite-articles/user-favourite-articles.service';
import { ArticleCategories } from '../../../core/models/core.model';
var CareerAdviceComponent = (function () {
    function CareerAdviceComponent(careerAdviceService, route, router, articleLikesService) {
        this.careerAdviceService = careerAdviceService;
        this.route = route;
        this.router = router;
        this.articleLikesService = articleLikesService;
        this.articles = [];
        this.topArticles = [];
        this.subNavState = false;
        this.collectionSize = 0;
        this.currentPage = 1;
        this.defaultLimit = 9;
        this.page = 1;
        this.articleCategories = ArticleCategories;
        this.getSelectedPackage();
    }
    CareerAdviceComponent.prototype.ngOnInit = function () {
        this.subscribeToParams();
        this.subscribeToQueryParams();
    };
    /**
     * Navigate to link
     * @param link
     */
    CareerAdviceComponent.prototype.openLink = function (link) {
        this.selectedPackage = link;
        this.currentPage = 1;
        this.router.navigate(["/app/career-advice/" + link]);
    };
    /**
     * Method to open article
     * @param url
     */
    CareerAdviceComponent.prototype.openArticle = function (url) {
        this.router.navigate(['/career-advice', url]);
    };
    CareerAdviceComponent.prototype.pageSelected = function () {
        if (this.page !== this.currentPage) {
            if (location) {
                this.router.navigate([location.pathname], { queryParams: { paged: this.currentPage } });
            }
        }
    };
    ;
    CareerAdviceComponent.prototype.onMenuOpen = function (state) {
        this.subNavState = state;
    };
    /**
     * Method to like article
     * @param {ArticleLikeEvent} $event
     * @param {boolean} isCarousel
     */
    CareerAdviceComponent.prototype.likeArticle = function ($event, isCarousel) {
        var _this = this;
        if (isCarousel === void 0) { isCarousel = false; }
        if ($event.state) {
            this.toggleLikeHandler($event, isCarousel);
            this.articleLikesService.likeArticle($event.id)
                .filter(function () { return _this.toggleLikeFilter($event, isCarousel); })
                .subscribe(function (res) { return _this.toggleLikeHandler($event, isCarousel); }, function () { return _this.revertArticleHandler($event, isCarousel); });
        }
        else {
            this.toggleLikeHandler($event, isCarousel);
            this.articleLikesService.unLikeArticle($event.id)
                .filter(function () { return _this.toggleLikeFilter($event, isCarousel); })
                .subscribe(function (res) { return _this.toggleLikeHandler($event, isCarousel); }, function () { return _this.revertArticleHandler($event, isCarousel); });
        }
    };
    CareerAdviceComponent.prototype.toggleLikeFilter = function ($event, isCarousel) {
        if (isCarousel) {
            return !!$event.callback;
        }
        else {
            return !!$event.id && !Number.isNaN($event.index) && $event.index >= 0;
        }
    };
    /**
     * Method to revert like handle event
     * @param {ArticleLikeEvent} $event
     * @param {boolean} isCarousel
     */
    CareerAdviceComponent.prototype.toggleLikeHandler = function ($event, isCarousel) {
        if (isCarousel) {
            $event.callback && $event.callback();
        }
        else {
            this.articles[$event.index].liked = $event.state;
        }
    };
    /**
     * Method to toggle article like event
     * @param {ArticleLikeEvent} $event
     * @param {boolean} isCarousel
     */
    CareerAdviceComponent.prototype.revertArticleHandler = function ($event, isCarousel) {
        if (isCarousel) {
            $event.revertCallback && $event.revertCallback();
        }
        else if (this.articles[$event.index].liked === $event.state) {
            this.articles[$event.index].liked = !$event.state;
        }
    };
    CareerAdviceComponent.prototype.setContent = function (content) {
        if (content) {
            this.content = content.content;
            this.articles = content.blogs;
            this.topArticles = content.top;
            this.collectionSize = content.count * this.defaultLimit;
        }
    };
    /**
     * Method to load articles
     * @param url
     * @param page
     */
    CareerAdviceComponent.prototype.loadArticles = function (url, page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (this.getCurrentPage() && page === 1) {
            page = this.getCurrentPage();
        }
        this.careerAdviceService.getAllArticles({ url: url, page: page })
            .subscribe(function (response) {
            _this.setContent(response);
            _this.page = page;
        }, this.handleError.bind(this));
    };
    /**
     * Method to subscribes to router params
     */
    CareerAdviceComponent.prototype.subscribeToParams = function () {
        var _this = this;
        this.route.params
            .filter(function (params) { return !!params.title; })
            .subscribe(function (params) { return _this.loadArticles(params.title); });
    };
    /**
     * Method to subscribe to query params
     */
    CareerAdviceComponent.prototype.subscribeToQueryParams = function () {
        var _this = this;
        this.route.queryParams
            .filter(function (queryParams) { return !!queryParams.paged; })
            .subscribe(function (queryParams) { return _this.queryParamsHandler(queryParams); });
    };
    CareerAdviceComponent.prototype.queryParamsHandler = function (queryParams) {
        if (this.page !== this.currentPage) {
            this.loadArticles(this.route.snapshot.params['title'], +queryParams.paged);
        }
        else if (queryParams.paged) {
            this.page = +queryParams.paged;
            this.currentPage = +queryParams.paged;
        }
    };
    CareerAdviceComponent.prototype.getSelectedPackage = function () {
        if (location) {
            this.selectedPackage = this.articleCategories.filter(function (item) {
                return item.link === location.pathname.replace('/app/career-advice/', '');
            }).map(function (item) {
                return item.title;
            })[0];
        }
    };
    CareerAdviceComponent.prototype.getCurrentPage = function () {
        return this.route.snapshot.queryParams.paged;
    };
    /**
     * Method to handle error
     * @param error
     */
    CareerAdviceComponent.prototype.handleError = function (error) {
        this.error = error.message;
    };
    CareerAdviceComponent = __decorate([
        Component({
            selector: 'career-advice-component',
            templateUrl: 'app-career-advice.component.html',
            styles: [require('./app-career-advice.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [UserCareerAdviceService,
            ActivatedRoute,
            Router,
            UserFavoriteArticlesService])
    ], CareerAdviceComponent);
    return CareerAdviceComponent;
}());
export { CareerAdviceComponent };
