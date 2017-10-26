import {Component, Input, ViewEncapsulation} from '@angular/core';

import {IArticleAuthor} from '../../../core/models/core.model';

@Component({
  selector: 'article-author-component',
  templateUrl: 'article-author.html',
  styles: [require('./article-author.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ArticleAuthorComponent {

  @Input()
  author: IArticleAuthor;

  public authorAvatarNotLoaded(event: ErrorEvent): void {
    if (event.target) {
      (<HTMLSourceElement>event.target).src = require('../../../../assets/images/logo-company.png');
    }
  }
}