var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FmpChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FmpSendBoxModule } from './send-box/send-box.module';
import { MessageDayPipe } from './day-pipe/message-day.pipe';
var FmpChatModule = /** @class */ (function () {
    function FmpChatModule() {
    }
    FmpChatModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                FmpSendBoxModule
            ],
            providers: [
                ChatService
            ],
            declarations: [
                FmpChatComponent,
                MessageDayPipe
            ],
            exports: [
                FmpChatComponent
            ]
        })
    ], FmpChatModule);
    return FmpChatModule;
}());
export { FmpChatModule };
