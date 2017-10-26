import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserFavoriteArticlesService} from './user-favourite-articles.service';
import {ActivatedRoute, Router} from '@angular/router';

import {IFavoriteArticleResponse} from './user-favorite-articles.model';
import {
  ArticleOpenEvent,
  IBlogArticleCard
} from '../../../modules/articles-cards/article-preview/article-preview.model';
import {UserService} from '../../../core/services/user.service';
import {Title} from '@angular/platform-browser';
import {CoreUtilitiesService} from '../../../core/services/core-utilities.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'fmp-user-favorite-articles-layout',
  templateUrl: 'user-favorite-articles.html',
  styles: [require('./user-favorite-articles.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class UserFavoriteArticlesComponent implements OnInit, OnDestroy {

  public articles: Array<IBlogArticleCard>;
  public currentPage: number = 1;
  public defaultLimit: number = 9;
  public collectionSize: number = 0;
  public isAuth: boolean = false;
  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private articlesService: UserFavoriteArticlesService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private titleService: Title,
              private coreUtilities: CoreUtilitiesService) {

    this.titleService.setTitle('My Favorite Articles - Find My Profession');
    this.authSubscription();
  }

  ngOnInit() {
    this.subscribeToParams();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public pageSelected(): void {
    if (this.currentPage === 1) {
      this.router.navigate(['/my-favorite-articles']);
    } else {
      this.router.navigate(['/my-favorite-articles'], {queryParams: {page: this.currentPage}});
    }
  }

  public openArticle($event: ArticleOpenEvent): void {
    if ($event.newTab) {
      this.coreUtilities.openArticleInNewTab($event.url);
    } else {
      this.router.navigate(['/career-advice', $event.url]);
    }
  }

  public likedStatusChanged(event: any): void {
    this.articlesService.unLikeArticle(event.id)
      .subscribe(
        () => this.loadArticles()
      );
  }

  private subscribeToParams(): void {
    this.route.queryParams
      .do((params: any) => this.checkForDefaultPage(!params.page))
      .filter((params: any) => params.page)
      .map((params: any) => +params.page)
      .filter((page: any) => !Number.isNaN(page))
      .subscribe(
        (page: number) => {
          this.currentPage = page;
          this.loadArticles();
        }
      );
  }

  private loadArticles(): void {
    this.articlesService.getArticles(this.currentPage)
      .subscribe(
        (response: IFavoriteArticleResponse) => {
          this.collectionSize = this.defaultLimit * response.pages;
          this.articles = response.likes;
        }
      );
  }

  private checkForDefaultPage(needLoad: boolean): void {
    if (needLoad) {
      this.loadArticles();
    }
  }

  private authSubscription(): void {
    this.userService.isAuth$
      .takeUntil(this.destroyed$)
      .subscribe(
        (state: boolean) => this.isAuth = state
      );
  }
}