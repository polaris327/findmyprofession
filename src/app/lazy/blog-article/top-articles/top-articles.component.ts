import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {ArticleOpenEvent} from '../../../modules/articles-cards/article-preview/article-preview.model';

@Component({
  selector: 'fmp-article-top-articles-component',
  templateUrl: 'top-articles.component.html',
  styles: [require('./top-articles.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ArticleTopArticlesComponent {

  @Input()
  articles: Array<any>;

  @Output()
  onArticleOpen: EventEmitter<ArticleOpenEvent> = new EventEmitter<ArticleOpenEvent>();

  constructor() {}

  public openArticle(event: MouseEvent, url: string): void {
    if (url) {
      event.preventDefault();
      this.onArticleOpen.emit({
        url,
        newTab: event.ctrlKey || event.metaKey
      });
    }
  }
}