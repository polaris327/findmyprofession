import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ArticlePreviewComponent} from "./article-preview/article-preview.component";
import {ArticlesCardsComponent} from "./articles-cards.component";
import {LikeIconModule} from '../like-icon/like-icon.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LikeIconModule,
    SharedModule
  ],
  declarations: [
    ArticlePreviewComponent,
    ArticlesCardsComponent
  ],
  exports: [
    ArticlesCardsComponent
  ]
})
export class ArticleCardsModule {}
