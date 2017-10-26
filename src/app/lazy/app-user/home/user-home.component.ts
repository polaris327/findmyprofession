import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IChatMessage, IHomeSlideArticle, IUserHome, UIMessage} from './user-home.model';
import {IUserUpdates} from './updates/updates.model';
import {ArticleLikeEvent} from '../../../modules/articles-cards/article-preview/article-preview.model';
import {UserFavoriteArticlesService} from '../favorite-articles/user-favourite-articles.service';
import {IErrorResponse} from '../../../core/models/core.model';
import {CoreUtilitiesService} from '../../../core/services/core-utilities.service';
import {MetaTags} from '../../../core/services/meta-tags.service';

@Component({
  selector: 'fmp-user-home-component',
  templateUrl: 'user-home.html',
  styles: [require('./user-home.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class UserHomeComponent {

  public chatMessages: Array<UIMessage> = [];
  public articles: Array<IHomeSlideArticle>;
  public updates: IUserUpdates;
  private errorMessage: string;

  constructor(private route: ActivatedRoute,
              private articleLikesService: UserFavoriteArticlesService,
              private metaService: MetaTags) {

    this.metaService.setTitle('My Home - Find My Profession');
    const homeData: IUserHome = route.snapshot.data['data'];
    
    if (homeData) {
      this.chatMessages = UserHomeComponent.parseMessages(homeData.chat);
      this.updates = homeData.updates;
      this.articles = homeData.slider || [];
    } else {
      this.chatMessages = [];
    }
  }

  /**
   * Method to toggle article like
   * @param $event
   */
  public articleLikeToggle($event: ArticleLikeEvent): void {
    if ($event.state) {
      this.articleLikesService.likeArticle($event.id)
        .subscribe(
          (res) => $event.callback(),
          this.handleError.bind(this)
        );
    } else {
      this.articleLikesService.unLikeArticle($event.id)
        .subscribe(
          (res) => $event.callback(),
          this.handleError.bind(this)
        );
    }
  }

  public static parseMessages(list: Array<IChatMessage>): Array<UIMessage> {
    return list.map((item: UIMessage, index: number) => {
      item.showDay = index > 1 ? !this.compareDates(list[index - 1].date, item.date) : true;
      item.message = CoreUtilitiesService.parseMessage(item.message);
      return item;
    });
  }

  /**
   * Method to handle error
   * @param error
   */
  private handleError(error: IErrorResponse): void {
    this.errorMessage = error.message;
  }

  public static compareDates(dateA: string, dateB: string): boolean {
    return new Date(dateA).toDateString() === new Date(dateB).toDateString();
  }
}