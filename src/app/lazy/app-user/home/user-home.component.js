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
import { ActivatedRoute } from '@angular/router';
import { UserFavoriteArticlesService } from '../favorite-articles/user-favourite-articles.service';
import { CoreUtilitiesService } from '../../../core/services/core-utilities.service';
import { MetaTags } from '../../../core/services/meta-tags.service';
var UserHomeComponent = /** @class */ (function () {
    function UserHomeComponent(route, articleLikesService, metaService) {
        this.route = route;
        this.articleLikesService = articleLikesService;
        this.metaService = metaService;
        this.chatMessages = [];
        this.metaService.setTitle('My Home - Find My Profession');
        var homeData = route.snapshot.data['data'];
        if (homeData) {
            this.chatMessages = UserHomeComponent_1.parseMessages(homeData.chat);
            this.updates = homeData.updates;
            this.articles = homeData.slider || [];
        }
        else {
            this.chatMessages = [];
        }
    }
    UserHomeComponent_1 = UserHomeComponent;
    /**
     * Method to toggle article like
     * @param $event
     */
    UserHomeComponent.prototype.articleLikeToggle = function ($event) {
        if ($event.state) {
            this.articleLikesService.likeArticle($event.id)
                .subscribe(function (res) { return $event.callback(); }, this.handleError.bind(this));
        }
        else {
            this.articleLikesService.unLikeArticle($event.id)
                .subscribe(function (res) { return $event.callback(); }, this.handleError.bind(this));
        }
    };
    UserHomeComponent.parseMessages = function (list) {
        var _this = this;
        return list.map(function (item, index) {
            item.showDay = index > 1 ? !_this.compareDates(list[index - 1].date, item.date) : true;
            item.message = CoreUtilitiesService.parseMessage(item.message);
            return item;
        });
    };
    /**
     * Method to handle error
     * @param error
     */
    UserHomeComponent.prototype.handleError = function (error) {
        this.errorMessage = error.message;
    };
    UserHomeComponent.compareDates = function (dateA, dateB) {
        return new Date(dateA).toDateString() === new Date(dateB).toDateString();
    };
    UserHomeComponent = UserHomeComponent_1 = __decorate([
        Component({
            selector: 'fmp-user-home-component',
            templateUrl: 'user-home.html',
            styles: [require('./user-home.scss').toString()],
            encapsulation: ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            UserFavoriteArticlesService,
            MetaTags])
    ], UserHomeComponent);
    return UserHomeComponent;
    var UserHomeComponent_1;
}());
export { UserHomeComponent };
