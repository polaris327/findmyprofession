import {
  Component, HostListener, OnInit,
  ViewEncapsulation
} from '@angular/core'
import {TransferState} from '../modules/transfer-state/transfer-state';
import {UserService} from './core/services/user.service';
import {NavigationEnd, Router} from '@angular/router';
import {BasketService} from './core/services/basket.service';
import {IBasketItem} from './core/models/basket.model';
import {APP_CONFIG} from './core/models/app.config';
import {ResizeModeService} from './core/services/resize-mode.service';
import {PlatformCheckService} from './core/services/platform-check.service';
import {MetaTags} from './core/services/meta-tags.service';
import {DOMAIN, DOMAIN_URL, PROTOCOL} from '../main.config';
import {HttpService} from './core/services/http.service';
import {Observable} from 'rxjs/Observable';
import {LinkService} from './core/services/link-selector.service';
import {IHttpRequest} from './core/models/core.model';
import {Title} from '@angular/platform-browser';

export declare var Stripe: any;
declare var _gaq: any;

@Component({
  selector: 'fmp-app',
  templateUrl: 'app.component.html',
  styles: [require('./app.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class FMPAppComponent implements OnInit {

  public pageH1Title: string;
  public isHomeUrl: boolean = false;

  public isHeaderShow: boolean = true;
  public isFooterShow: boolean = true;

  public showBasket: boolean = false;

  public authState: boolean;

  public isScrolled: boolean = false;
  public scrolledToTop: boolean = false;

  private basketLength: boolean = false;
  private isComponentInited: boolean = false;

  public isMobile: boolean = false;

  public headerClasses: any = {
    'main-header-unreg-blue': false,
    'main-header-unreg-lightest': false
  };

  public mainClasses: any = {
    'main-p0': false,
    'main-pb0': false,
    'main-blue': false
  };

  private mainRoutes: any = {
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

  private readonly headersRoutes: any = {
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

  private showCart: Array<string> = [
    '/career-finder',
    '/resume-makeover',
    '/cover-letter-service',
    '/linkedin-profile-makeover',
    '/job-interview-prep'
  ];

  private isHeaderNoShowRoutes: Array<string> = [
    // '/career-finder-congratulation'
  ];

  private isFooterNoShowRoutes: Array<string> = [
    '/career-finder-congratulation'
  ];

  constructor(private cache: TransferState,
              private userService: UserService,
              private router: Router,
              private basketService: BasketService,
              private resizeModeService: ResizeModeService,
              private platformService: PlatformCheckService,
              private metaService: MetaTags,
              private httpService: HttpService,
              private linkService: LinkService,
              private titleService: Title) {

    this.watchForRouterEventsOnServer();

    if (this.platformService.isBrowser) {

      this.createAuthSub();

      this.createBasketSub();

      this.watchForRouterEvents();
    }
  }

  ngOnInit() {
    this.cache.set('cached', true);

    if (this.platformService.isBrowser) {
      this.isComponentInited = true;
      this.loadGAScript();
      this.resizeModeService.windowWidth = window.innerWidth;
    }
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.isMobile = window.innerWidth < 1025;
    this.resizeModeService.windowWidth = window.innerWidth;
  }

  @HostListener('window:scroll')
  public onAppScroll(): void {
    const scrolled: number = Number.parseInt((window.pageYOffset || document.documentElement.scrollTop).toString());
    if (scrolled !== 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
      this.scrolledToTop = true;
      setTimeout(() => {
        this.scrolledToTop = false;
      }, 0);
    }
  }

  private watchForRouterEventsOnServer(): void {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .takeWhile(() => !this.platformService.isBrowser)
      .subscribe(
        (event: NavigationEnd) => {
          const startUrl: string = `${DOMAIN_URL}${event.urlAfterRedirects}`;
          let url: string  = startUrl;
          if (url && url.charAt(url.length - 1) === '/') {
            url = url.substr(0, url.length - 1);
          }
          this.metaService.setUrl(startUrl);
          // if (url !== startUrl) {
          //   this.linkService.addTag({rel: 'canonical', href: url});
          //   this.linkService.addTag({rel: 'alternate', hreflang: 'es', href: url});
          // }
        }
      );
  }

  private onRouterEvents(event: NavigationEnd): void {
    this.isHomeUrl = event.urlAfterRedirects === '/';
    this.pageH1Title = this.titleService.getTitle();

    Object.keys(this.headersRoutes).forEach((key: string) => {
      this.headerClasses[key] = this.headersRoutes[key]
        .some((route: string) => {
          if (location.pathname.includes('/career-advice')) {
            return location.pathname.includes(route);
          }
          return location.pathname === route;
        });
    });

    Object.keys(this.mainRoutes).forEach((key: string) => {
      this.mainClasses[key] = this.mainRoutes[key]
        .some((route: string) => {
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
  }

  /**
   * Detect if header need to show
   */
  private isHeaderNeedShow(): void {
    if (this.platformService.isBrowser) {
      this.isHeaderShow = !this.isHeaderNoShowRoutes.some((route: string) => {
        return location.pathname.startsWith(route);
      });
    }
  }

  /**
   * Detect if footer need to show
   */
  private isFooterNeedShow(): void {
    if (this.platformService.isBrowser) {
      this.isFooterShow = !this.isFooterNoShowRoutes.some((route: string) => {
        return location.pathname.startsWith(route);
      });
    }
  }

  /**
   * Method to create google analytics
   */
  private createAnalytics(): void {
    /**
     * Need to set to global namespace
     * @type {any|Array}
     * @private
     */
    var _gaq = window['_gaq'] || [];
    _gaq.push(['_setAccount', APP_CONFIG.google_analytics_id]);
    _gaq.push(['_trackPageview']);
  }

  private createAuthSub(): void {
    this.userService.isAuth$
      .subscribe(
        (state: boolean) => this.authState = state
      );
  }

  private createBasketSub(): void {
    this.basketService.basket$
      .filter((basket: Array<IBasketItem>) => Array.isArray(basket))
      .subscribe(
        (basket: Array<IBasketItem>) => this.basketLength = basket.length > 0
      );
  }

  private watchForRouterEvents(): void {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe(
        (event: NavigationEnd) => this.onRouterEvents(event)
      );
  }

  private checkBasketLength(event: NavigationEnd): void {
    this.showBasket = this.basketLength && this.showCart
      .some((value: string) => event.urlAfterRedirects === value);
  }

  private parseBlogSlugs(): Observable<string> {
    return this.httpService.sendRequest({
      url: '/blog/slugs'
    }).map((slugs: Array<{url: string}>) => {
      const siteMapSlugs: Array<string> = slugs.map((slug: {url: string}) => {
        const url: string = slug.url;
        return `<url>
               <loc>${PROTOCOL.front}${DOMAIN}/career-advice/${url}</loc> 
              </url>`;
      });
      return siteMapSlugs.join('\n');
    });
  }

  private loadGAScript(): void {
    const request: IHttpRequest = {
      url: 'https://www.findmyprofession.com/analytics',
      absolutePath: true,
      isText: true
    };
    this.httpService.sendRequest(request)
      .subscribe(
        (text: string) => {
          const element: HTMLElement = document.createElement('script');
          element.innerText = text;
          document.body.appendChild(element);
        }
      );
  }
}
