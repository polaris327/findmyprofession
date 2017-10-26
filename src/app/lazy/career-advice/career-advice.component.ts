import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {
  CareerAdvice, IArticleType,
  ICarerrAdvicePageContent
} from './career-advice.model';
import {CareerAdviceService} from './career-advice.service';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import {ModalCreatorService} from '../../core/services/modals-creator.service';
import {UserFavoriteArticlesService} from '../app-user/favorite-articles/user-favourite-articles.service';
import {UserService} from '../../core/services/user.service';
import {ArticleLikeEvent, ArticleOpenEvent} from '../../modules/articles-cards/article-preview/article-preview.model';
import {ResizeModeService} from '../../core/services/resize-mode.service';
import {MODE_MOB} from '../../core/models/core.model';
import {MetaTags} from '../../core/services/meta-tags.service';
import {CoreUtilitiesService} from '../../core/services/core-utilities.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'career-advice-component',
  templateUrl: 'career-advice.component.html',
  styles: [require('./career-advice.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CareerAdviceComponent implements OnInit, OnDestroy {

  public articlesMap: Map<number, Array<CareerAdvice.IBlogArticle>>;

  public selectedPackage: string;

  public content: CareerAdvice.ICareerAdviceContent;

  public pageContent: ICarerrAdvicePageContent;

  public articleCategories: Array<IArticleType> = [
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

  public articles: Array<CareerAdvice.IBlogArticle> = [];
  public topArticles: Array<CareerAdvice.IBlogArticle> = [];

  public subNavState: boolean = false;
  public collectionSize: number = 0;

  public currentPage: number = 1;
  public defaultLimit: number = 9;
  public page: number = 1;

  public error: any;
  public isUserAuth: boolean = false;
  public isMobileMode: boolean = false;
  private isLikesReady: boolean = false;
  private destroyed$: Subject<any> = new Subject<any>();
  private sub: any;

  public searchTxt: string;
  
  constructor(private careerAdviceService: CareerAdviceService,
              private route: ActivatedRoute,
              private router: Router,
              private platformService: PlatformCheckService,
              private modalService: ModalCreatorService,
              private articleLikeService: UserFavoriteArticlesService,
              private userService: UserService,
              private resizeModeService: ResizeModeService,
              private metaTags: MetaTags,
              private coreUtilities: CoreUtilitiesService) {

    this.articlesMap = new Map<number, Array<CareerAdvice.IBlogArticle>>();

    this.checkForAuth();

    const content: CareerAdvice.ICareerAdvice = route.snapshot.data['pageContent'];
    this.setContent(content);

    if (this.platformService.isBrowser) {
      this.selectedPackage = this.articleCategories
        .filter((item: any) => item.link === location.pathname.replace('/', ''))
        .map((item: any) => item.title)[0];
    }
  } 

  public ngOnInit(): void {

    this.route.queryParams
      .filter(() => this.platformService.isBrowser)
      .subscribe(
        (params: any) => {
          this.searchTxt = params.searchStr;
          if(this.searchTxt == undefined){
            if (this.page !== this.currentPage) {
              this.loadArticles(location.pathname.replace('/', ''), +params.paged);
            } else if (params.paged) {
              this.page = +params.paged;
              this.currentPage = +params.paged;
            }
          } else {
            this.searchArticles(this.searchTxt);
          }
          
        }
      );

    this.checkForResizeMode();

    if (this.isUserAuth) {
      this.getLikedArticles();
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private getLikedArticles(): void {
    const ids: Array<number> =  Array.from(this.articlesMap.keys());

    this.articleLikeService.checkIfArticlesLiked(ids)
      .finally(() => this.isLikesReady = true)
      .subscribe(
        (response) => {
          Object.keys(response[0]).forEach((key: string) => {
            const articles: Array<CareerAdvice.IBlogArticle> = this.articlesMap.get(+key);
            if (Array.isArray(articles)) {
              articles.forEach((article: CareerAdvice.IBlogArticle) => article.liked = true);
            }
          })
        }
      );
  }

  /**
   * Navigate to link
   * @param link
   */
  public openLink(link: string): void {
    this.selectedPackage = link;
    this.router.navigate([link]);
  }

  public openArticle($event: ArticleOpenEvent): void {
    if ($event.newTab && this.platformService.isBrowser) {
      this.coreUtilities.openArticleInNewTab($event.url);
    } else {
      this.router.navigate(['/career-advice', $event.url]);
    }
  }

  public pageSelected(): void {
    if (this.page !== this.currentPage) {
      if (this.platformService.isBrowser) {
        this.router.navigate([location.pathname], {queryParams: {paged: this.currentPage}});
      }
    }
  };

  public onMenuOpen(state: boolean): void {
    this.subNavState = state;
  }

  public likeSelectedArticle($event: ArticleLikeEvent, isCarousel: boolean = false): void {
    if (this.isUserAuth && this.isLikesReady) {
      this.likeArticle($event, isCarousel);
    } else {
      this.modalService.openLikeWarning();
    }
  }

  /**
   * Method to like article
   * @param {ArticleLikeEvent} $event
   * @param {boolean} isCarousel
   */
  public likeArticle($event: ArticleLikeEvent, isCarousel: boolean = false): void {
    if ($event.state) {
      this.toggleLikeHandler($event, isCarousel);
      this.articleLikeService.likeArticle($event.id)
        .filter(() => this.toggleLikeFilter($event, isCarousel))
        .subscribe(
          (res) => this.toggleLikeHandler($event, isCarousel),
          () => this.revertArticleHandler($event, isCarousel)
        );
    } else {
      this.toggleLikeHandler($event, isCarousel);
      this.articleLikeService.unLikeArticle($event.id)
        .filter(() => this.toggleLikeFilter($event, isCarousel))
        .subscribe(
          (res) => this.toggleLikeHandler($event, isCarousel),
          () => this.revertArticleHandler($event, isCarousel)
        );
    }
  }

  private toggleLikeFilter($event: ArticleLikeEvent, isCarousel: boolean): boolean {
    if (isCarousel) {
      return !!$event.callback;
    }
    else {
      return !!$event.id && !Number.isNaN($event.index) && $event.index >= 0;
    }
  }

  /**
   * Method to revert like handle event
   * @param {ArticleLikeEvent} $event
   * @param {boolean} isCarousel
   */
  private toggleLikeHandler($event: ArticleLikeEvent, isCarousel: boolean): void {
    if (isCarousel) {
      $event.callback && $event.callback();
    } else {
      this.articles[$event.index].liked = $event.state;
    }
  }

  /**
   * Method to toggle article like event
   * @param {ArticleLikeEvent} $event
   * @param {boolean} isCarousel
   */
  private revertArticleHandler($event: ArticleLikeEvent, isCarousel: boolean): void {
    if (isCarousel) {
      $event.revertCallback && $event.revertCallback();
    } else if (this.articles[$event.index].liked === $event.state) {
      this.articles[$event.index].liked = !$event.state;
    }
  }

  private setContent(content: CareerAdvice.ICareerAdvice): void {
    if (content) {
      const description: string = `The FMP Contributor is the publication of Find My Profession, offering the best career advice to find your dream job.`;
      this.content = content.content;
      this.articles = content.blogs;
      this.topArticles = content.top;

      this.metaTags.setTitle(this.content.title);
      this.metaTags.setTitles(this.content.title);
      this.metaTags.setDescription(description);
      this.metaTags.removeImageTags();

      this.collectionSize = content.count * this.defaultLimit;

      if (this.isUserAuth) {

        content.blogs.forEach((blog: CareerAdvice.IBlogArticle) => {
          let blogList: Array<CareerAdvice.IBlogArticle> = this.articlesMap.get(blog.id);
          if (!blogList) {
            blogList = [];
          }
          blogList.push(blog);
          this.articlesMap.set(blog.id, blogList);
        });

        content.top.forEach((blog: CareerAdvice.IBlogArticle) => {
          let blogList: Array<CareerAdvice.IBlogArticle> = this.articlesMap.get(blog.id);
          if (!blogList) {
            blogList = [];
          }
          blogList.push(blog);
          this.articlesMap.set(blog.id, blogList);
        });
      } else {
        this.articles.forEach((article: CareerAdvice.IBlogArticle) => article.liked = false);
        this.topArticles.forEach((article: CareerAdvice.IBlogArticle) => article.liked = false);
      }
    }
  }

  private loadArticles(url: string, page: number = 1): void {
    this.careerAdviceService.getArticles({url, page})
      .subscribe(
        (response: CareerAdvice.ICareerAdvice) => {
          this.setContent(response);
          this.page = page;
        },
        (error: any) => this.error = error
      );
  }
  private searchArticles(searchTxt: string):void {

  }
  private checkForAuth(): void {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => this.isUserAuth = state
      );
  }

  private checkForResizeMode(): void {
    this.resizeModeService.mode$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: string) => this.isMobileMode = state === MODE_MOB
      );
  }
}