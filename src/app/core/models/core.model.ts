import {IArticleType} from '../../lazy/career-advice/career-advice.model';
/**
 * Custom Http Request model
 */
export interface IHttpRequest {
  url: string;
  method?: string;
  encoding?: string;
  searchParams?: Object;
  body?: any;
  setToHeaders?: Object;
  userToken?: boolean;
  absolutePath?: boolean;
  isBlob?: boolean;
  isText?: boolean;
}

/**
 * Model that describe response if result is Error
 */
export interface IErrorResponse {
  status: string;
  message: string;
}

/**
 * Model that describe author of any article
 */
export interface IArticleAuthor {
  readonly avatar?: string;
  readonly description?: string;
  readonly name?: string;
  readonly link?: string;
  readonly avatar_alt?: string;
}

export interface ServicePriceResponse {
  price_senior: number;
  price_executive?: number;
}

export const MODE_MOB: string = 'mob';
export const MODE_DESK: string = 'desk';

export interface CustomChanges<Type> {
  currentValue: Type;
  previousValue: Type;
  callback?: Function;
}

export interface ConfigEntity<Type> {
  readonly front: Type;
  readonly back: Type;
}
