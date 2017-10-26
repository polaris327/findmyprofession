import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SubscribeToArticleComponent} from './subscribe-to-article.component';
import {BlogArticleService} from '../blog-article.service';
import {SubscribeToArticleErrors} from './subscribe-to-article.model';
import {CircleIconLineModule} from '../../../modules/circle-icon-line/circle-icon-line.module';
import {ErrorModule} from "../../../modules/error/error.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CircleIconLineModule,
    ErrorModule
  ],
  providers: [
    BlogArticleService,
    SubscribeToArticleErrors
  ],
  declarations: [
    SubscribeToArticleComponent
  ],
  exports: [
    SubscribeToArticleComponent
  ]
})
export class SubscribeToArticleModule {}
