import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {IHomeSlideArticle} from '../user-home.model';
import {Router} from '@angular/router';
import {ArticleOpenEvent} from '../../../../modules/articles-cards/article-preview/article-preview.model';
import {CoreUtilitiesService} from '../../../../core/services/core-utilities.service';

@Component({
  selector: 'fmp-home-career-advice-component',
  templateUrl: 'home-career-advice.html',
  styles: [require('./home-career-advice.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class HomeCareerAdviceComponent {

  @Input()
  topArticles: Array<IHomeSlideArticle>;

  @Output()
  onArticleLikeToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router,
              private coreUtilities: CoreUtilitiesService) {}

  public selectedPackage: string = 'All Articles';

  public categoryChange(category: string): void {
    this.router.navigate([`/${category}`])
  }

  public toggleArticleLike($event: any): void {
    this.onArticleLikeToggle.emit($event);
  }

  public openSelectedArticle($event: ArticleOpenEvent): void {
    if ($event.newTab) {
      this.coreUtilities.openArticleInNewTab($event.url);
    } else {
      this.router.navigate(['/career-advice', $event.url]);
    }
  }
}