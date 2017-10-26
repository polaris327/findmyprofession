var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
import { DOMAIN_URL } from '../../../main.config';
var AssetsPathPipe = /** @class */ (function () {
    function AssetsPathPipe() {
    }
    AssetsPathPipe.prototype.transform = function (url) {
        if (url === void 0) { url = ''; }
        if (!url) {
            return url;
        }
        return DOMAIN_URL + "/" + url;
    };
    AssetsPathPipe = __decorate([
        Pipe({ name: 'assets' })
    ], AssetsPathPipe);
    return AssetsPathPipe;
}());
export { AssetsPathPipe };
