var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerTransferStateModule } from '../modules/transfer-state/server-transfer-state.module';
import { FMPAppComponent } from './app.component';
import { AppModule } from './app.module';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { BrowserModule } from '@angular/platform-browser';
var ServerAppModule = /** @class */ (function () {
    function ServerAppModule(transferState) {
        var _this = this;
        this.transferState = transferState;
        // Gotcha
        this.ngOnBootstrap = function () {
            _this.transferState.inject();
        };
    }
    ServerAppModule = __decorate([
        NgModule({
            bootstrap: [FMPAppComponent],
            imports: [
                BrowserModule.withServerTransition({
                    appId: 'my-app-id'
                }),
                ServerModule,
                ServerTransferStateModule,
                AppModule
            ]
        }),
        __metadata("design:paramtypes", [TransferState])
    ], ServerAppModule);
    return ServerAppModule;
}());
export { ServerAppModule };
