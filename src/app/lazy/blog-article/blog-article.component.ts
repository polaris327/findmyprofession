import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {IBlogArticle, IBlogTopArticle} from './blog-article.model';
import {
  ArticleLikeEvent, ArticleOpenEvent,
  IBlogArticleCard
} from '../../modules/articles-cards/article-preview/article-preview.model';
import {MetaTags} from '../../core/services/meta-tags.service';
import {BlogArticleService} from './blog-article.service';
import {UserService} from '../../core/services/user.service';
import {UserFavoriteArticlesService} from '../app-user/favorite-articles/user-favourite-articles.service';
import {IErrorResponse, MODE_MOB} from '../../core/models/core.model';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import {ModalCreatorService} from '../../core/services/modals-creator.service';
import {DOMAIN_URL} from '../../../main.config';
import {ResizeModeService} from '../../core/services/resize-mode.service';
import {CoreUtilitiesService} from '../../core/services/core-utilities.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'blog-article-component',
  templateUrl: 'blog-article.html',
  styles: [require('./blog-article.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class BlogArticleComponent implements OnInit, OnDestroy, AfterViewInit {

  public static inited: boolean = false;

  @ViewChild('articlesBlock')
  articlesBlock: any;

  @ViewChild('boxLight')
  boxLight: ElementRef;

  @ViewChild('sharingBlock')
  sharingBlock: ElementRef;

  @ViewChild('subscribeBlock')
  subscribeBlock: any;

  public isMobileMode: boolean = false;
  public isAuth: boolean = false;
  public isBlocksFixed: boolean = true;

  public article: IBlogArticle;

  public pageData: any;

  public articleId: string;

  public topArticles: Array<any> = [];

  public cardArticles: Array<IBlogArticleCard> = [];

  public isArticleLike: boolean = false;

  private articleUrl: string;
  private articleNumberId: number;
  private errorMessage: string;
  private isComponentInited: boolean = false;

  private shareBlockLeftOffset: number = 0;

  private offsetLeft: number = 0;
  private absoluteOffset: number = 0;
  private readonly paddingTop: number = 217;
  private readonly destroyed$: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private metaService: MetaTags,
              private articleService: BlogArticleService,
              private router: Router,
              private userService: UserService,
              private articleLikeService: UserFavoriteArticlesService,
              private platformService: PlatformCheckService,
              private modalService: ModalCreatorService,
              private resizeService: ResizeModeService,
              private coreUtilities: CoreUtilitiesService,
              private changeDetector: ChangeDetectorRef) {

    this.articleId = route.snapshot.params['title'];

    const data: IBlogArticle = <IBlogArticle>route.snapshot.data['article'];

    this.createAuthSub();
    if (data) {
      this.articleUrl = data.url;
      this.articleNumberId = data.id;
      this.setArticleData(data);
    }
  }

  public ngOnInit() {

    this.route.params
      .filter((params: any) => this.article && this.articleUrl !== params.title)
      .flatMap((params: any) => this.articleService.getArticleData(params.title))
      .filter((article: IBlogArticle) => !!article)
      .subscribe(
        (article: IBlogArticle) => this.setArticleData(article, true)
      );

    if (this.platformService.isBrowser) {
      this.isComponentInited = true;
      BlogArticleComponent.inited = true;

      if (this.isAuth) {
        this.checkIfArticleLiked();

        this.checkIfArticlesLiked(this.cardArticles.map((article: IBlogArticleCard) => article.id));
      }
    }

  }

  public ngAfterViewInit(): void {
    this.initOffset(BlogArticleComponent.getMode(this.resizeService.mode$.getValue()));

    if (this.platformService.isBrowser && !this.isMobileMode) {
      (<HTMLDivElement>this.articlesBlock.nativeElement).style.top = '125px';
      this.scrollEvent();
    }

    this.subscribeToResize();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    BlogArticleComponent.inited = false;
  }

  public isSharingBlockFixed: boolean = false;

  @HostListener('window:scroll')
  public scrollEvent(): void {
    if (this.platformService.isBrowser && !this.isMobileMode) {

      const sharingBlockBoundary: ClientRect = this.sharingBlock.nativeElement.getBoundingClientRect();

      const height: number = this.subscribeBlock.element.nativeElement.getBoundingClientRect().height;

      const articlesBoundary: ClientRect = this.articlesBlock.nativeElement.getBoundingClientRect();
      const boxLightBoundary: ClientRect = this.boxLight.nativeElement.getBoundingClientRect();

      const innerBlockHeight: number = articlesBoundary.height;
      const blockHeight: number = boxLightBoundary.height;
      const sharingBlockHeight: number = sharingBlockBoundary.height;

      this.isBlocksFixed = window.scrollY < blockHeight - innerBlockHeight - height;
      this.isSharingBlockFixed = window.scrollY < blockHeight - sharingBlockHeight - height - 30;

      const offset: number = (boxLightBoundary.height - articlesBoundary.height - height + this.paddingTop / 2 + 20) - window.scrollY;
      const sharingBlockOffset: number = (boxLightBoundary.height - sharingBlockBoundary.height - height + this.paddingTop / 2 + 20) - window.scrollY;

      const block: HTMLDivElement = (<HTMLDivElement>this.articlesBlock.nativeElement);
      const share: HTMLDivElement = (<HTMLDivElement>this.sharingBlock.nativeElement);

      if (!this.isBlocksFixed) {
        block.style.position = 'fixed';
        block.style.left = 'auto';
        block.style.top = setPixelValue(offset);
      } else {
        block.style.position = 'fixed';
        block.style.top = '125px';
        block.style.left = null;
        block.style.right = null;
      }

      if (!this.isSharingBlockFixed) {
        share.style.top = setPixelValue(sharingBlockOffset);
        share.style.left = 'auto';
        share.style.width = '80px';
      } else {
        share.style.position = 'fixed';
        share.style.top = '161px';
        share.style.left = null;
        share.style.right = null;
      }

    }
  }

  /**
   * Method to open specific article
   * @param $event
   */
  public openArticle($event: ArticleOpenEvent): void {
    if ($event.newTab) {
      this.coreUtilities.openArticleInNewTab($event.url);
    } else {
      this.router.navigate(['/career-advice', $event.url]);
    }
  }

  /**
   * Method to handle click event to all articles
   * @param mouseEvent
   */
  public openAllArticles(mouseEvent: MouseEvent): void {
    mouseEvent.preventDefault();
    this.navigateToAllArticles();
  }

  public toggleArticleLike($state: boolean): void {
    if (this.isComponentInited) {
      if (!this.isAuth) {
        this.modalService.openLikeWarning();
      }
      else {
        this.toggleSelectedArticleId(this.articleNumberId, $state, () => {
          this.isArticleLike = $state;
        });
      }
    }
  }

  /**
   * Method to handle tap event
   * @param event
   */
  public linkTapedHandler(event: TouchEvent): void {
    event.preventDefault();
    this.navigateToAllArticles();
  }

  public toggleListArticleLike($event: ArticleLikeEvent): void {
    if (this.isComponentInited) {
      if (!this.isAuth) {
        this.modalService.openLikeWarning();
      } else {
        const revert: Function = () => {
          if (this.cardArticles[$event.index].liked === $event.state) {
            this.cardArticles[$event.index].liked = !$event.state;
          }
        };
        const success: Function = () => {
          this.cardArticles[$event.index].liked = $event.state;
        };
        this.toggleSelectedArticleId($event.id, $event.state, success, revert);
      }
    }
  }

  /**
   * Method to toggle article by id
   * @param {number} articleId
   * @param {boolean} state
   * @param {Function} successCallback
   * @param {Function} errorCallback
   */
  private toggleSelectedArticleId(articleId: number, state: boolean, successCallback: Function, errorCallback?: Function): void {
    if (state) {
      successCallback && successCallback();
      this.articleLikeService.likeArticle(articleId)
        .subscribe(
          () => successCallback && successCallback(),
          (error: IErrorResponse) => errorCallback && errorCallback()
        );
    } else {
      successCallback && successCallback();
      this.articleLikeService.unLikeArticle(articleId)
        .subscribe(
          () => successCallback && successCallback(),
          (error: IErrorResponse) => errorCallback && errorCallback()
        );
    }
  }

  private navigateToAllArticles(): void {
    this.router.navigate(['/career-advice']);
  }

  /**
   * Method to set article data
   * @param data
   * @param checkLikes
   */
  private setArticleData(data: IBlogArticle, checkLikes?: boolean): void {
    this.articleUrl = data.url;
    if (data.content) {
      data.content = data.content.replace(/\n/g, '<p></p>');
    }
    this.article = data;

    this.metaService.setUrl(`${DOMAIN_URL}/career-advice/${data.url}`);
    this.metaService.setMetaTags(data);

    if (data.tops) {
      /**
       * Filter elements if exist
       * @type {IBlogTopArticle[]}
       */
      this.topArticles = data.tops.filter((element: IBlogTopArticle) => !!element);
    }

    if (data.random_blogs) {
      this.cardArticles = data.random_blogs;
    }

    if (this.isAuth && checkLikes) {
      this.checkIfArticleLiked();

      this.checkIfArticlesLiked(this.cardArticles.map((article: IBlogArticleCard) => article.id));
    }
  }

  /**
   * Method to check if user is auth
   */
  private createAuthSub(): void {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe((state: boolean) => this.isAuth = state)
  }

  /**
   * Method to check if current article is liked for current user
   */
  private checkIfArticleLiked(): any {
    this.articleLikeService.isArticleLiked(this.articleNumberId)
      .filter(() => this.userService.isAuth$.getValue())
      .subscribe(
        (state: { is_liked: boolean }) => this.isArticleLike = state.is_liked,
        this.handleError.bind(this)
      );
  }

  private checkIfArticlesLiked(ids: Array<number>): void {
    this.articleLikeService.checkIfArticlesLiked(ids)
      .subscribe(
        (response: Array<any>) => {
          if (Array.isArray(response)) {
            response.forEach((entity: Object) => {
              Object.keys(entity)
                .filter((key: any) => entity.hasOwnProperty(key))
                .forEach((key: any) => {
                  for (let i = 0; i < this.cardArticles.length; i++) {
                    if (this.cardArticles[i].id === +key) {
                      this.cardArticles[i].liked = true;
                      break;
                    }
                  }
                })
            });
          }
        }
      );
  }

  private subscribeToResize(): void {
    this.resizeService.mode$
      .takeUntil(this.destroyed$)
      .subscribe(
        (mode: string) => this.initOffset(BlogArticleComponent.getMode(mode))
      );
  }

  private initOffset(isMobileMode: boolean = false): void {
    this.isMobileMode = isMobileMode;
    this.changeDetector.detectChanges();
    if (this.platformService.isBrowser && !this.isMobileMode) {
      const blockBoundary: ClientRect = this.articlesBlock.nativeElement.getBoundingClientRect();
      this.offsetLeft = blockBoundary.left;
      this.absoluteOffset = blockBoundary.right;
      this.shareBlockLeftOffset = this.sharingBlock.nativeElement.getBoundingClientRect().left;
    }
  }

  private static getMode(mode: string): boolean {
    return mode === MODE_MOB;
  }

  /**
   * Method to handle error
   * @param {IErrorResponse} error
   */
  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }

}

const setPixelValue = (value: number) => `${value}px`;