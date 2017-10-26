var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { UserService } from './core/services/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { BasketService } from './core/services/basket.service';
import { APP_CONFIG } from './core/models/app.config';
import { ResizeModeService } from './core/services/resize-mode.service';
import { PlatformCheckService } from './core/services/platform-check.service';
import { MetaTags } from './core/services/meta-tags.service';
import { DOMAIN, DOMAIN_URL, PROTOCOL } from '../main.config';
import { HttpService } from './core/services/http.service';
import { LinkService } from './core/services/link-selector.service';
import { Title } from '@angular/platform-browser';
var FMPAppComponent = (function () {
    function FMPAppComponent(cache, userService, router, basketService, resizeModeService, platformService, metaService, httpService, linkService, titleService) {
        this.cache = cache;
        this.userService = userService;
        this.router = router;
        this.basketService = basketService;
        this.resizeModeService = resizeModeService;
        this.platformService = platformService;
        this.metaService = metaService;
        this.httpService = httpService;
        this.linkService = linkService;
        this.titleService = titleService;
        this.isHomeUrl = false;
        this.isHeaderShow = true;
        this.isFooterShow = true;
        this.showBasket = false;
        this.isScrolled = false;
        this.scrolledToTop = false;
        this.basketLength = false;
        this.isComponentInited = false;
        this.isMobile = false;
        this.headerClasses = {
            'main-header-unreg-blue': false,
            'main-header-unreg-lightest': false
        };
        this.mainClasses = {
            'main-p0': false,
            'main-pb0': false,
            'main-blue': false
        };
        this.mainRoutes = {
            'main-p0': [
                '/about-us',
                '/faq',
                '/terms-of-use',
                '/contact-us',
                '/checkout',
                '/my-profile',
                '/my-schedule',
                '/career-finder-congratulation'
            ],
            'main-pb0': [
                // '/career-finder-congratulation'
                '/404'
            ],
            'main-blue': [
                '/login',
                '/password-reset'
            ]
        };
        this.headersRoutes = {
            'main-header-unreg-blue': [
                '/login',
                '/password-reset'
            ],
            'main-header-unreg-lightest': [
                '/career-advice',
                '/testimonials',
                '/resume-cover-letter',
                '/linkedin',
                '/job-search',
                '/interviewing',
                '/checkout',
                '/career-finder-congratulation'
            ]
        };
        this.showCart = [
            '/career-finder',
            '/resume-makeover',
            '/cover-letter-service',
            '/linkedin-profile-makeover',
            '/job-interview-prep'
        ];
        this.isHeaderNoShowRoutes = [];
        this.isFooterNoShowRoutes = [
            '/career-finder-congratulation'
        ];
        this.watchForRouterEventsOnServer();
        if (this.platformService.isBrowser) {
            this.createAuthSub();
            this.createBasketSub();
            this.watchForRouterEvents();
        }
    }
    FMPAppComponent.prototype.ngOnInit = function () {
        this.cache.set('cached', true);
        if (this.platformService.isBrowser) {
            this.isComponentInited = true;
            this.loadGAScript();
            this.resizeModeService.windowWidth = window.innerWidth;
        }
    };
    FMPAppComponent.prototype.onResize = function () {
        this.isMobile = window.innerWidth < 1025;
        this.resizeModeService.windowWidth = window.innerWidth;
    };
    FMPAppComponent.prototype.onAppScroll = function () {
        var _this = this;
        var scrolled = Number.parseInt((window.pageYOffset || document.documentElement.scrollTop).toString());
        if (scrolled !== 0) {
            this.isScrolled = true;
        }
        else {
            this.isScrolled = false;
            this.scrolledToTop = true;
            setTimeout(function () {
                _this.scrolledToTop = false;
            }, 0);
        }
    };
    FMPAppComponent.prototype.watchForRouterEventsOnServer = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .takeWhile(function () { return !_this.platformService.isBrowser; })
            .subscribe(function (event) {
            var startUrl = "" + DOMAIN_URL + event.urlAfterRedirects;
            var url = startUrl;
            if (url && url.charAt(url.length - 1) === '/') {
                url = url.substr(0, url.length - 1);
            }
            _this.metaService.setUrl(startUrl);
            // if (url !== startUrl) {
            //   this.linkService.addTag({rel: 'canonical', href: url});
            //   this.linkService.addTag({rel: 'alternate', hreflang: 'es', href: url});
            // }
        });
    };
    FMPAppComponent.prototype.onRouterEvents = function (event) {
        var _this = this;
        this.isHomeUrl = event.urlAfterRedirects === '/';
        this.pageH1Title = this.titleService.getTitle();
        Object.keys(this.headersRoutes).forEach(function (key) {
            _this.headerClasses[key] = _this.headersRoutes[key]
                .some(function (route) {
                if (location.pathname.includes('/career-advice')) {
                    return location.pathname.includes(route);
                }
                return location.pathname === route;
            });
        });
        Object.keys(this.mainRoutes).forEach(function (key) {
            _this.mainClasses[key] = _this.mainRoutes[key]
                .some(function (route) {
                if (location.pathname.includes('/career-advice')) {
                    return location.pathname.includes(route);
                }
                return location.pathname === route;
            });
        });
        this.checkBasketLength(event);
        this.isHeaderNeedShow();
        this.isFooterNeedShow();
        window.scrollTo(0, 0);
    };
    /**
     * Detect if header need to show
     */
    FMPAppComponent.prototype.isHeaderNeedShow = function () {
        if (this.platformService.isBrowser) {
            this.isHeaderShow = !this.isHeaderNoShowRoutes.some(function (route) {
                return location.pathname.startsWith(route);
            });
        }
    };
    /**
     * Detect if footer need to show
     */
    FMPAppComponent.prototype.isFooterNeedShow = function () {
        if (this.platformService.isBrowser) {
            this.isFooterShow = !this.isFooterNoShowRoutes.some(function (route) {
                return location.pathname.startsWith(route);
            });
        }
    };
    /**
     * Method to create google analytics
     */
    FMPAppComponent.prototype.createAnalytics = function () {
        /**
         * Need to set to global namespace
         * @type {any|Array}
         * @private
         */
        var _gaq = window['_gaq'] || [];
        _gaq.push(['_setAccount', APP_CONFIG.google_analytics_id]);
        _gaq.push(['_trackPageview']);
    };
    FMPAppComponent.prototype.createAuthSub = function () {
        var _this = this;
        this.userService.isAuth$
            .subscribe(function (state) { return _this.authState = state; });
    };
    FMPAppComponent.prototype.createBasketSub = function () {
        var _this = this;
        this.basketService.basket$
            .filter(function (basket) { return Array.isArray(basket); })
            .subscribe(function (basket) { return _this.basketLength = basket.length > 0; });
    };
    FMPAppComponent.prototype.watchForRouterEvents = function () {
        var _this = this;
        this.router.events
            .filter(function (event) { return event instanceof NavigationEnd; })
            .subscribe(function (event) { return _this.onRouterEvents(event); });
    };
    FMPAppComponent.prototype.checkBasketLength = function (event) {
        this.showBasket = this.basketLength && this.showCart
            .some(function (value) { return event.urlAfterRedirects === value; });
    };
    FMPAppComponent.prototype.parseBlogSlugs = function () {
        return this.httpService.sendRequest({
            url: '/blog/slugs'
        }).map(function (slugs) {
            var siteMapSlugs = slugs.map(function (slug) {
                var url = slug.url;
                return "<url>\n               <loc>" + PROTOCOL.front + DOMAIN + "/career-advice/" + url + "</loc> \n              </url>";
            });
            return siteMapSlugs.join('\n');
        });
    };
    FMPAppComponent.prototype.loadGAScript = function () {
        var request = {
            url: 'https://www.findmyprofession.com/analytics',
            absolutePath: true,
            isText: true
        };
        this.httpService.sendRequest(request)
            .subscribe(function (text) {
            var element = document.createElement('script');
            element.innerText = text;
            document.body.appendChild(element);
        });
    };
    return FMPAppComponent;
}());
__decorate([
    HostListener('window:resize'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FMPAppComponent.prototype, "onResize", null);
__decorate([
    HostListener('window:scroll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FMPAppComponent.prototype, "onAppScroll", null);
FMPAppComponent = __decorate([
    Component({
        selector: 'fmp-app',
        templateUrl: 'app.component.html',
        styles: [require('./app.component.scss').toString()],
        encapsulation: ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [TransferState,
        UserService,
        Router,
        BasketService,
        ResizeModeService,
        PlatformCheckService,
        MetaTags,
        HttpService,
        LinkService,
        Title])
], FMPAppComponent);
export { FMPAppComponent };
