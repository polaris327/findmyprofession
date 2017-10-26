import {IPageData} from '../../core/models/page-data.model';

export namespace IFaq {

  export interface IFaqPage extends IPageData {
    content: IFaqContent;
  }

  export interface IFaqContent {
    page_content: Array<IFaqEntity>;
    page_title: string;
  }
}

export interface IFaqEntity {
  readonly question: string;
  readonly answer: string;
}