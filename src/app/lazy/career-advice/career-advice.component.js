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
import { CareerAdviceService } from './career-advice.service';
import { PlatformCheckService } from '../../core/services/platform-check.service';
import { ModalCreatorService } from '../../core/services/modals-creator.service';
import { UserFavoriteArticlesService } from '../app-user/favorite-articles/user-favourite-articles.service';
import { UserService } from '../../core/services/user.service';
import { ResizeModeService } from '../../core/services/resize-mode.service';
import { MODE_MOB } from '../../core/models/core.model';
import { MetaTags } from '../../core/services/meta-tags.service';
import { CoreUtilitiesService } from '../../core/services/core-utilities.service';
import { Subject } from 'rxjs/Subject';
var CareerAdviceComponent = /** @class */ (function () {
    function CareerAdviceComponent(careerAdviceService, route, router, platformService, modalService, articleLikeService, userService, resizeModeService, metaTags, coreUtilities) {
        this.careerAdviceService = careerAdviceService;
        this.route = route;
        this.router = router;
        this.platformService = platformService;
        this.modalService = modalService;
        this.articleLikeService = articleLikeService;
        this.userService = userService;
        this.resizeModeService = resizeModeService;
        this.metaTags = metaTags;
        this.coreUtilities = coreUtilities;
        this.articleCategories = [
            {
                title: 'All Articles',
                link: 'career-advice'
            },
            {
                title: 'LinkedIn',
                link: 'linkedin'
            },
            {
                title: 'Resume + Cover Letter',
                link: 'resume-cover-letter'
            },
            {
                title: 'Interviewing',
                link: 'interviewing'
            },
            {
                title: 'Job Search',
                link: 'job-search'
            }
        ];
        this.articles = [];
        this.topArticles = [];
        this.subNavState = false;
        this.collectionSize = 0;
        this.currentPage = 1;
        this.defaultLimit = 9;
        this.page = 1;
        this.isUserAuth = false;
        this.isMobileMode = false;
        this.isLikesReady = false;
        this.destroyed$ = new Subject();
        this.articlesMap = new Map();
        this.checkForAuth();
        var content = route.snapshot.data['pageContent'];
        this.setContent(content);
        if (this.platformService.isBrowser) {
            this.selectedPackage = this.articleCategories
                .filter(function (item) { return item.link === location.pathname.replace('/', ''); })
                .map(function (item) { return item.title; })[0];
        }
    }
    CareerAdviceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams
            .filter(function () { return _this.platformService.isBrowser; })
            .subscribe(function (params) {
            if (_this.page !== _this.currentPage) {
                _this.loadArticles(location.pathname.replace('/', ''), +params.paged);
            }
            else if (params.paged) {
                _this.page = +params.paged;
                _this.currentPage = +params.paged;
            }
        });
        this.checkForResizeMode();
        if (this.isUserAuth) {
            this.getLikedArticles();
        }
    };
    CareerAdviceComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
    };
    CareerAdviceComponent.prototype.getLikedArticles = function () {
        var _this = this;
        var ids = Array.from(this.articlesMap.keys());
        this.articleLikeService.checkIfArticlesLiked(ids)
            .finally(function () { return _this.isLikesReady = true; })
            .subscribe(function (response) {
            Object.keys(response[0]).forEach(function (key) {
                var articles = _this.articlesMap.get(+key);
                if (Array.isArray(articles)) {
                    articles.forEach(function (article) { return article.liked = true; });
                }
            });
        });
    };
    /**
     * Navigate to link
     * @param link
     */
    CareerAdviceComponent.prototype.openLink = function (link) {
        this.selectedPackage = link;
        this.router.navigate([link]);
    };
    CareerAdviceComponent.prototype.openArticle = function ($event) {
        if ($event.newTab && this.platformService.isBrowser) {
            this.coreUtilities.openArticleInNewTab($event.url);
        }
        else {
            this.router.navigate(['/career-advice', $event.url]);
        }
    };
    CareerAdviceComponent.prototype.pageSelected = function () {
        if (this.page !== this.currentPage) {
            if (this.platformService.isBrowser) {
                this.router.navigate([location.pathname], { queryParams: { paged: this.currentPage } });
            }
        }
    };
    ;
    CareerAdviceComponent.prototype.onMenuOpen = function (state) {
        this.subNavState = state;
    };
    CareerAdviceComponent.prototype.likeSelectedArticle = function ($event, isCarousel) {
        if (isCarousel === void 0) { isCarousel = false; }
        if (this.isUserAuth && this.isLikesReady) {
            this.likeArticle($event, isCarousel);
        }
        else {
            this.modalService.openLikeWarning();
        }
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
            this.articleLikeService.likeArticle($event.id)
                .filter(function () { return _this.toggleLikeFilter($event, isCarousel); })
                .subscribe(function (res) { return _this.toggleLikeHandler($event, isCarousel); }, function () { return _this.revertArticleHandler($event, isCarousel); });
        }
        else {
            this.toggleLikeHandler($event, isCarousel);
            this.articleLikeService.unLikeArticle($event.id)
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
        var _this = this;
        if (content) {
            var description = "The FMP Contributor is the publication of Find My Profession, offering the best career advice to find your dream job.";
            this.content = content.content;
            this.articles = content.blogs;
            this.topArticles = content.top;
            this.metaTags.setTitle(this.content.title);
            this.metaTags.setTitles(this.content.title);
            this.metaTags.setDescription(description);
            this.metaTags.removeImageTags();
            this.collectionSize = content.count * this.defaultLimit;
            if (this.isUserAuth) {
                content.blogs.forEach(function (blog) {
                    var blogList = _this.articlesMap.get(blog.id);
                    if (!blogList) {
                        blogList = [];
                    }
                    blogList.push(blog);
                    _this.articlesMap.set(blog.id, blogList);
                });
                content.top.forEach(function (blog) {
                    var blogList = _this.articlesMap.get(blog.id);
                    if (!blogList) {
                        blogList = [];
                    }
                    blogList.push(blog);
                    _this.articlesMap.set(blog.id, blogList);
                });
            }
            else {
                this.articles.forEach(function (article) { return article.liked = false; });
                this.topArticles.forEach(function (article) { return article.liked = false; });
            }
        }
    };
    CareerAdviceComponent.prototype.loadArticles = function (url, page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        this.careerAdviceService.getArticles({ url: url, page: page })
            .subscribe(function (response) {
            _this.setContent(response);
            _this.page = page;
        }, function (error) { return _this.error = error; });
    };
    CareerAdviceComponent.prototype.checkForAuth = function () {
        var _this = this;
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isUserAuth = state; });
    };
    CareerAdviceComponent.prototype.checkForResizeMode = function () {
        var _this = this;
        this.resizeModeService.mode$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isMobileMode = state === MODE_MOB; });
    };
    CareerAdviceComponent = __decorate([
        Component({
            selector: 'career-advice-component',
            templateUrl: 'career-advice.component.html',
            styles: [require('./career-advice.component.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [CareerAdviceService,
            ActivatedRoute,
            Router,
            PlatformCheckService,
            ModalCreatorService,
            UserFavoriteArticlesService,
            UserService,
            ResizeModeService,
            MetaTags,
            CoreUtilitiesService])
    ], CareerAdviceComponent);
    return CareerAdviceComponent;
}());
export { CareerAdviceComponent };
