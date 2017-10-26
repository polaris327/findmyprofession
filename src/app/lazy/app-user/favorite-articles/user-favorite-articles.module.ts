import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserFavoriteArticlesRoutingModule} from './user-favorite-articles-routing.module';
import {UserFavoriteArticlesComponent} from './user-favorite-articles.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {ArticleCardsModule} from '../../../modules/articles-cards/articles-cards.module';

@NgModule({
  imports: [
    CommonModule,
    UserFavoriteArticlesRoutingModule,
    ArticleCardsModule,
    NgbPaginationModule
  ],
  declarations: [
    UserFavoriteArticlesComponent
  ],
  exports: [
    UserFavoriteArticlesComponent
  ]
})
export class UserFavoriteArticlesModule {}