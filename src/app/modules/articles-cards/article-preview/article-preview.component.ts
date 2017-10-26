import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ArticleOpenEvent, IBlogArticleCard} from './article-preview.model';

@Component({
  selector: 'fmp-article-preview-component',
  templateUrl: 'article-preview.html',
  styles: [require('./article-preview.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ArticlePreviewComponent implements AfterViewInit, OnDestroy {

  @ViewChild('description')
  description: any;

  @Input()
  articleCard: IBlogArticleCard;

  @Input()
  isAuth: boolean = false;

  @Output()
  onArticleOpen: EventEmitter<ArticleOpenEvent> = new EventEmitter<ArticleOpenEvent>();

  @Output()
  onArticleLike: EventEmitter<boolean> = new EventEmitter<boolean>();

  public defaultAvatar: string = require('../../../../assets/images/logo-company.png');

  constructor(public changeDetector: ChangeDetectorRef) {}

  public ngAfterViewInit(): void {
    while (this.description.nativeElement.offsetHeight > 75) {
      this.articleCard.description = this.articleCard.description.replace(/\W*\s(\S)*$/, '...');
      this.changeDetector.detectChanges();
    }
  }

  public ngOnDestroy(): void {
    this.changeDetector.detach();
  }

  public openArticle(event?: MouseEvent): void {
    this.onArticleOpen.emit({
      url: this.articleCard.url,
      newTab: event ? event.ctrlKey || event.metaKey : false
    });
  }

  public toggleLike($event: boolean): void {
    this.onArticleLike.emit($event);
  }

  public authorAvatarNotLoaded(event: ErrorEvent): void {
    if (event.target) {
      (<HTMLSourceElement>event.target).src = this.defaultAvatar;
    }
  }

  /**
   * Method to handle touch start on link
   * @param event
   */
  public articleLinkTaped(event: TouchEvent): void {
    event.preventDefault();
    this.openArticle();
  }
}