var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './chat.service';
import { UserService } from '../../../../core/services/user.service';
import { CoreUtilitiesService } from '../../../../core/services/core-utilities.service';
import { Subject } from 'rxjs/Subject';
import { UserHomeComponent } from '../user-home.component';
var FmpChatComponent = (function () {
    function FmpChatComponent(userService, chatService, changeDetector) {
        this.userService = userService;
        this.chatService = chatService;
        this.changeDetector = changeDetector;
        this.chatRefreshTime = 5000;
        this.messageIds = {};
        this.isPageActive = true;
        this.isSending = false;
        this.isUrl = false;
        this.destroyed$ = new Subject();
        this.subscribeToUser();
    }
    FmpChatComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var messages = changes['messages'];
        if (messages && messages.currentValue) {
            this.messages.forEach(function (message) { return _this.messageIds[message['id']] = true; });
        }
    };
    FmpChatComponent.prototype.ngAfterViewInit = function () {
        this.scrollToBottom();
        this.startMessageAutoUpdate();
        this.checkForPageTab();
    };
    FmpChatComponent.prototype.ngOnDestroy = function () {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.changeDetector.detach();
    };
    FmpChatComponent.prototype.sendMessage = function (message) {
        var _this = this;
        var url_exp = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/g;
        if (message && message.message) {
            message.message = message.message.replace(/\n/g, '\r\n');
        }
        this.isUrl = url_exp.test(message.message);
        if (this.isUrl)
            message.message = this.makeToHyperlink(message.message);
        this.chatService.sendMessage(message)
            .do(function () { return _this.isSending = true; })
            .finally(function () { return _this.isSending = false; })
            .debounceTime(500)
            .subscribe(function (response) {
            _this.addMessage(response, _this.messages);
            _this.changeDetector.detectChanges();
            _this.scrollToBottom();
        });
    };
    FmpChatComponent.prototype.makeToHyperlink = function (str) {
        var hyperLink = '<a href="' + str + '" target="_blank">' + str + '</a>';
        return hyperLink;
    };
    /**
     * Method to auto updating chat
     */
    FmpChatComponent.prototype.startMessageAutoUpdate = function () {
        var _this = this;
        this.refreshingSub = Observable.interval(this.chatRefreshTime)
            .takeUntil(this.destroyed$)
            .subscribe(function () { return _this.loadNewMessages(); });
    };
    FmpChatComponent.prototype.downloadFile = function (message, $event) {
        $event.preventDefault();
        this.chatService.downloadFile(message.attachment.toString())
            .subscribe(function (data) { return CoreUtilitiesService.saveFile(data, message.message.toString()); });
    };
    FmpChatComponent.prototype.addMessage = function (message, list) {
        if (list === void 0) { list = []; }
        if (message && message.id && !this.messageIds[message.id]) {
            this.messageIds[message.id] = true;
            var lastMessage = list[list.length - 1];
            if (lastMessage && UserHomeComponent.compareDates(lastMessage.date, message.date)) {
                message.showDay = false;
            }
            message.message = CoreUtilitiesService.parseMessage(message.message);
            list.push(message);
        }
    };
    FmpChatComponent.prototype.checkForPageTab = function () {
        var _this = this;
        Observable.fromEvent(document, 'visibilitychange')
            .takeUntil(this.destroyed$)
            .map(function (e) { return !e.target.hidden; })
            .do(function (state) {
            if (state && _this.refreshingSub.closed) {
                _this.startMessageAutoUpdate();
            }
        })
            .subscribe(function (isPageActive) {
            _this.isPageActive = isPageActive;
        });
    };
    FmpChatComponent.prototype.loadNewMessages = function () {
        var _this = this;
        this.chatService.getNewMessages()
            .filter(function (messages) { return Array.isArray(messages) && messages.length > 0; })
            .subscribe(function (messages) {
            messages.forEach(function (message) { return _this.addMessage(message, _this.messages); });
            _this.changeDetector.detectChanges();
            _this.scrollToBottom();
        }, function (error) { return _this._handleError(error); });
    };
    /**
     * Scrolling to bottom of the div
     */
    FmpChatComponent.prototype.scrollToBottom = function () {
        if (this.chatHolder) {
            this.chatHolder.nativeElement.scrollTop = this.chatHolder.nativeElement.scrollHeight || 0;
        }
    };
    FmpChatComponent.prototype.subscribeToUser = function () {
        var _this = this;
        this.userService.user$
            .takeUntil(this.destroyed$)
            .filter(function (user) { return Boolean(user); })
            .subscribe(function (user) { return _this.userId = user.id; });
    };
    /**
     * Method to handle error
     * @param e
     * @private
     */
    FmpChatComponent.prototype._handleError = function (e) {
        this.errorMessage = e.message;
    };
    return FmpChatComponent;
}());
__decorate([
    ViewChild('chatHolder'),
    __metadata("design:type", Object)
], FmpChatComponent.prototype, "chatHolder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], FmpChatComponent.prototype, "messages", void 0);
__decorate([
    Input(),
    __metadata("design:type", Number)
], FmpChatComponent.prototype, "chatRefreshTime", void 0);
FmpChatComponent = __decorate([
    Component({
        selector: 'fmp-chat-component',
        templateUrl: 'chat.html',
        styles: [require('./chat.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [UserService,
        ChatService,
        ChangeDetectorRef])
], FmpChatComponent);
export { FmpChatComponent };
