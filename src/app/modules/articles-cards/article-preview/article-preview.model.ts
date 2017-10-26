import {IArticleAuthor} from '../../../core/models/core.model';

export interface IBlogArticleCard {
  readonly id?: number;
  title: string;
  description: string;
  author: IArticleAuthor;
  url: string;
  image: string;
  liked?: boolean;
  image_alt?: string;
}

export type ArticleLikeEvent = {
  state?: boolean;
  id?: number;
  index?: number;
  callback?: Function;
  revertCallback?: Function;
};

export interface ArticleOpenEvent {
  url: string;
  newTab?: boolean;
}