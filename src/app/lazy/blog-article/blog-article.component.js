var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaTags } from '../../core/services/meta-tags.service';
import { BlogArticleService } from './blog-article.service';
import { UserService } from '../../core/services/user.service';
import { UserFavoriteArticlesService } from '../app-user/favorite-articles/user-favourite-articles.service';
import { MODE_MOB } from '../../core/models/core.model';
import { PlatformCheckService } from '../../core/services/platform-check.service';
import { ModalCreatorService } from '../../core/services/modals-creator.service';
import { DOMAIN_URL } from '../../../main.config';
import { ResizeModeService } from '../../core/services/resize-mode.service';
import { CoreUtilitiesService } from '../../core/services/core-utilities.service';
import { Subject } from 'rxjs/Subject';
var BlogArticleComponent = /** @class */ (function () {
    function BlogArticleComponent(route, metaService, articleService, router, userService, articleLikeService, platformService, modalService, resizeService, coreUtilities, changeDetector) {
        this.route = route;
        this.metaService = metaService;
        this.articleService = articleService;
        this.router = router;
        this.userService = userService;
        this.articleLikeService = articleLikeService;
        this.platformService = platformService;
        this.modalService = modalService;
        this.resizeService = resizeService;
        this.coreUtilities = coreUtilities;
        this.changeDetector = changeDetector;
        this.isMobileMode = false;
        this.isAuth = false;
        this.isBlocksFixed = true;
        this.topArticles = [];
        this.cardArticles = [];
        this.isArticleLike = false;
        this.isComponentInited = false;
        this.shareBlockLeftOffset = 0;
        this.offsetLeft = 0;
        this.absoluteOffset = 0;
        this.paddingTop = 217;
        this.destroyed$ = new Subject();
        this.isSharingBlockFixed = false;
        this.articleId = route.snapshot.params['title'];
        var data = route.snapshot.data['article'];
        this.createAuthSub();
        if (data) {
            this.articleUrl = data.url;
            this.articleNumberId = data.id;
            this.setArticleData(data);
        }
    }
    BlogArticleComponent_1 = BlogArticleComponent;
    BlogArticleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .filter(function (params) { return _this.article && _this.articleUrl !== params.title; })
            .flatMap(function (params) { return _this.articleService.getArticleData(params.title); })
            .filter(function (article) { return !!article; })
            .subscribe(function (article) { return _this.setArticleData(article, true); });
        if (this.platformService.isBrowser) {
            this.isComponentInited = true;
            BlogArticleComponent_1.inited = true;
            if (this.isAuth) {
                this.checkIfArticleLiked();
                this.checkIfArticlesLiked(this.cardArticles.map(function (article) { return article.id; }));
            }
        }
    };
    BlogArticleComponent.prototype.ngAfterViewInit = function () {
        this.initOffset(BlogArticleComponent_1.getMode(this.resizeService.mode$.getValue()));
        if (this.platformService.isBrowser && !this.isMobileMode) {
            this.articlesBlock.nativeElement.style.top = '125px';
            this.scrollEvent();
        }
        this.subscribeToResize();
    };
    BlogArticleComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        BlogArticleComponent_1.inited = false;
    };
    BlogArticleComponent.prototype.scrollEvent = function () {
        if (this.platformService.isBrowser && !this.isMobileMode) {
            var sharingBlockBoundary = this.sharingBlock.nativeElement.getBoundingClientRect();
            var height = this.subscribeBlock.element.nativeElement.getBoundingClientRect().height;
            var articlesBoundary = this.articlesBlock.nativeElement.getBoundingClientRect();
            var boxLightBoundary = this.boxLight.nativeElement.getBoundingClientRect();
            var innerBlockHeight = articlesBoundary.height;
            var blockHeight = boxLightBoundary.height;
            var sharingBlockHeight = sharingBlockBoundary.height;
            this.isBlocksFixed = window.scrollY < blockHeight - innerBlockHeight - height;
            this.isSharingBlockFixed = window.scrollY < blockHeight - sharingBlockHeight - height - 30;
            var offset = (boxLightBoundary.height - articlesBoundary.height - height + this.paddingTop / 2 + 20) - window.scrollY;
            var sharingBlockOffset = (boxLightBoundary.height - sharingBlockBoundary.height - height + this.paddingTop / 2 + 20) - window.scrollY;
            var block = this.articlesBlock.nativeElement;
            var share = this.sharingBlock.nativeElement;
            if (!this.isBlocksFixed) {
                block.style.position = 'fixed';
                block.style.left = 'auto';
                block.style.top = setPixelValue(offset);
            }
            else {
                block.style.position = 'fixed';
                block.style.top = '125px';
                block.style.left = null;
                block.style.right = null;
            }
            if (!this.isSharingBlockFixed) {
                share.style.top = setPixelValue(sharingBlockOffset);
                share.style.left = 'auto';
                share.style.width = '80px';
            }
            else {
                share.style.position = 'fixed';
                share.style.top = '161px';
                share.style.left = null;
                share.style.right = null;
            }
        }
    };
    /**
     * Method to open specific article
     * @param $event
     */
    BlogArticleComponent.prototype.openArticle = function ($event) {
        if ($event.newTab) {
            this.coreUtilities.openArticleInNewTab($event.url);
        }
        else {
            this.router.navigate(['/career-advice', $event.url]);
        }
    };
    /**
     * Method to handle click event to all articles
     * @param mouseEvent
     */
    BlogArticleComponent.prototype.openAllArticles = function (mouseEvent) {
        mouseEvent.preventDefault();
        this.navigateToAllArticles();
    };
    BlogArticleComponent.prototype.toggleArticleLike = function ($state) {
        var _this = this;
        if (this.isComponentInited) {
            if (!this.isAuth) {
                this.modalService.openLikeWarning();
            }
            else {
                this.toggleSelectedArticleId(this.articleNumberId, $state, function () {
                    _this.isArticleLike = $state;
                });
            }
        }
    };
    /**
     * Method to handle tap event
     * @param event
     */
    BlogArticleComponent.prototype.linkTapedHandler = function (event) {
        event.preventDefault();
        this.navigateToAllArticles();
    };
    BlogArticleComponent.prototype.toggleListArticleLike = function ($event) {
        var _this = this;
        if (this.isComponentInited) {
            if (!this.isAuth) {
                this.modalService.openLikeWarning();
            }
            else {
                var revert = function () {
                    if (_this.cardArticles[$event.index].liked === $event.state) {
                        _this.cardArticles[$event.index].liked = !$event.state;
                    }
                };
                var success = function () {
                    _this.cardArticles[$event.index].liked = $event.state;
                };
                this.toggleSelectedArticleId($event.id, $event.state, success, revert);
            }
        }
    };
    /**
     * Method to toggle article by id
     * @param {number} articleId
     * @param {boolean} state
     * @param {Function} successCallback
     * @param {Function} errorCallback
     */
    BlogArticleComponent.prototype.toggleSelectedArticleId = function (articleId, state, successCallback, errorCallback) {
        if (state) {
            successCallback && successCallback();
            this.articleLikeService.likeArticle(articleId)
                .subscribe(function () { return successCallback && successCallback(); }, function (error) { return errorCallback && errorCallback(); });
        }
        else {
            successCallback && successCallback();
            this.articleLikeService.unLikeArticle(articleId)
                .subscribe(function () { return successCallback && successCallback(); }, function (error) { return errorCallback && errorCallback(); });
        }
    };
    BlogArticleComponent.prototype.navigateToAllArticles = function () {
        this.router.navigate(['/career-advice']);
    };
    /**
     * Method to set article data
     * @param data
     * @param checkLikes
     */
    BlogArticleComponent.prototype.setArticleData = function (data, checkLikes) {
        this.articleUrl = data.url;
        if (data.content) {
            data.content = data.content.replace(/\n/g, '<p></p>');
        }
        this.article = data;
        this.metaService.setUrl(DOMAIN_URL + "/career-advice/" + data.url);
        this.metaService.setMetaTags(data);
        if (data.tops) {
            /**
             * Filter elements if exist
             * @type {IBlogTopArticle[]}
             */
            this.topArticles = data.tops.filter(function (element) { return !!element; });
        }
        if (data.random_blogs) {
            this.cardArticles = data.random_blogs;
        }
        if (this.isAuth && checkLikes) {
            this.checkIfArticleLiked();
            this.checkIfArticlesLiked(this.cardArticles.map(function (article) { return article.id; }));
        }
    };
    /**
     * Method to check if user is auth
     */
    BlogArticleComponent.prototype.createAuthSub = function () {
        var _this = this;
        this.userService.isAuth$
            .takeUntil(this.destroyed$)
            .subscribe(function (state) { return _this.isAuth = state; });
    };
    /**
     * Method to check if current article is liked for current user
     */
    BlogArticleComponent.prototype.checkIfArticleLiked = function () {
        var _this = this;
        this.articleLikeService.isArticleLiked(this.articleNumberId)
            .filter(function () { return _this.userService.isAuth$.getValue(); })
            .subscribe(function (state) { return _this.isArticleLike = state.is_liked; }, this.handleError.bind(this));
    };
    BlogArticleComponent.prototype.checkIfArticlesLiked = function (ids) {
        var _this = this;
        this.articleLikeService.checkIfArticlesLiked(ids)
            .subscribe(function (response) {
            if (Array.isArray(response)) {
                response.forEach(function (entity) {
                    Object.keys(entity)
                        .filter(function (key) { return entity.hasOwnProperty(key); })
                        .forEach(function (key) {
                        for (var i = 0; i < _this.cardArticles.length; i++) {
                            if (_this.cardArticles[i].id === +key) {
                                _this.cardArticles[i].liked = true;
                                break;
                            }
                        }
                    });
                });
            }
        });
    };
    BlogArticleComponent.prototype.subscribeToResize = function () {
        var _this = this;
        this.resizeService.mode$
            .takeUntil(this.destroyed$)
            .subscribe(function (mode) { return _this.initOffset(BlogArticleComponent_1.getMode(mode)); });
    };
    BlogArticleComponent.prototype.initOffset = function (isMobileMode) {
        if (isMobileMode === void 0) { isMobileMode = false; }
        this.isMobileMode = isMobileMode;
        this.changeDetector.detectChanges();
        if (this.platformService.isBrowser && !this.isMobileMode) {
            var blockBoundary = this.articlesBlock.nativeElement.getBoundingClientRect();
            this.offsetLeft = blockBoundary.left;
            this.absoluteOffset = blockBoundary.right;
            this.shareBlockLeftOffset = this.sharingBlock.nativeElement.getBoundingClientRect().left;
        }
    };
    BlogArticleComponent.getMode = function (mode) {
        return mode === MODE_MOB;
    };
    /**
     * Method to handle error
     * @param {IErrorResponse} error
     */
    BlogArticleComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    BlogArticleComponent.inited = false;
    __decorate([
        ViewChild('articlesBlock'),
        __metadata("design:type", Object)
    ], BlogArticleComponent.prototype, "articlesBlock", void 0);
    __decorate([
        ViewChild('boxLight'),
        __metadata("design:type", ElementRef)
    ], BlogArticleComponent.prototype, "boxLight", void 0);
    __decorate([
        ViewChild('sharingBlock'),
        __metadata("design:type", ElementRef)
    ], BlogArticleComponent.prototype, "sharingBlock", void 0);
    __decorate([
        ViewChild('subscribeBlock'),
        __metadata("design:type", Object)
    ], BlogArticleComponent.prototype, "subscribeBlock", void 0);
    __decorate([
        HostListener('window:scroll'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BlogArticleComponent.prototype, "scrollEvent", null);
    BlogArticleComponent = BlogArticleComponent_1 = __decorate([
        Component({
            selector: 'blog-article-component',
            templateUrl: 'blog-article.html',
            styles: [require('./blog-article.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            MetaTags,
            BlogArticleService,
            Router,
            UserService,
            UserFavoriteArticlesService,
            PlatformCheckService,
            ModalCreatorService,
            ResizeModeService,
            CoreUtilitiesService,
            ChangeDetectorRef])
    ], BlogArticleComponent);
    return BlogArticleComponent;
    var BlogArticleComponent_1;
}());
export { BlogArticleComponent };
var setPixelValue = function (value) { return value + "px"; };
