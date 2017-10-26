import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ArticleOpenEvent} from './article-preview/article-preview.model';

@Component({
  selector: 'articles-cards-component',
  templateUrl: 'articles-cards.component.html',
  styles: [require('./articles-cards.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesCardsComponent {

  @Input()
  articles;

  @Input()
  isAuth: boolean = false;

  @Output()
  onArticleOpen: EventEmitter<ArticleOpenEvent> = new EventEmitter<ArticleOpenEvent>();

  @Output()
  onArticleLike: EventEmitter<any> = new EventEmitter<any>();

  public openArticle($event: ArticleOpenEvent): void {
    this.onArticleOpen.emit($event);
  }

  public articleLiked(state: boolean, id: number, index: number): void {
    this.onArticleLike.emit({state, id, index});
  }
}