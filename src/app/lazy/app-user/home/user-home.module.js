var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home.component';
import { UserHomeDataResolver } from './user-home.resolver';
import { UserHomeRoutingModule } from './user-home-routing.module';
import { FmpChatModule } from './chat/chat.module';
import { HomeCareerAdviceModule } from './home-career-advice/home-career-advice.module';
import { UserHomeService } from './user-home.service';
import { HomeUpdatesModule } from './updates/updates.module';
var UserHomeModule = /** @class */ (function () {
    function UserHomeModule() {
    }
    UserHomeModule = __decorate([
        NgModule({
            imports: [
                UserHomeRoutingModule,
                CommonModule,
                FmpChatModule,
                HomeCareerAdviceModule,
                HomeUpdatesModule
            ],
            providers: [
                UserHomeDataResolver,
                UserHomeService
            ],
            declarations: [
                UserHomeComponent
            ],
            exports: [
                UserHomeComponent
            ]
        })
    ], UserHomeModule);
    return UserHomeModule;
}());
export { UserHomeModule };
