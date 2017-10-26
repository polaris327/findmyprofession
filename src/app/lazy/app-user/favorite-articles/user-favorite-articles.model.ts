import {IBlogArticleCard} from '../../../modules/articles-cards/article-preview/article-preview.model';

export interface IFavoriteArticleResponse {
  pages: number;
  likes: Array<IBlogArticleCard>;
}