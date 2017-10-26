import {IUserUpdates} from './updates/updates.model';

export interface IUserHome {
  chat: Array<IChatMessage>;
  updates: IUserUpdates;
  slider: Array<any>;
}

export interface IChatMessage {
  readonly id: number;
  attachment?: string | File;
  author?: number
  date?: string;
  message?: string;
  recipient?: number;
}
export interface IHomeSlideArticle {
  id: number;
  title: string;
  image: string;
  url: string;
  liked: boolean;
}

export interface UIMessage extends IChatMessage {
  showDay?: boolean;
}
