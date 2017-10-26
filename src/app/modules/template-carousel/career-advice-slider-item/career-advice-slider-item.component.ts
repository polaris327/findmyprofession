import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CareerAdviceSliderItem} from './career-advice-slider-item.model';
import {ArticleOpenEvent} from '../../articles-cards/article-preview/article-preview.model';

@Component({
  selector: 'career-advice-slider-item-component',
  templateUrl: 'career-advice-slider-item.component.html',
  styles: [require('./career-advice-slider-item.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CareerAdviceSliderItemComponent {

  @Input()
  item: CareerAdviceSliderItem;

  @Output()
  onLikeToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onArticleOpen: EventEmitter<ArticleOpenEvent> = new EventEmitter<ArticleOpenEvent>();

  public showBox: boolean = false;

  public toggleBox(state: boolean): void {
    this.showBox = state;
  }

  public toggleLike($state: boolean): void {
    this.onLikeToggle.emit($state);
  }

  public openArticle(event: MouseEvent, url: string): void {
    this.emitOpenArticle({
      url,
      newTab: event.ctrlKey || event.metaKey
    });
  }

  public handleRouterClick(event: MouseEvent, url: string): void {
    event.preventDefault();
    this.emitOpenArticle({
      url,
      newTab: event.ctrlKey || event.metaKey
    });
  }

  private emitOpenArticle($event: ArticleOpenEvent): void {
    this.onArticleOpen.emit($event);
  }
}