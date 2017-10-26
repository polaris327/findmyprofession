import {IPageData} from '../../core/models/page-data.model';
export namespace AboutUs {

  export interface IAboutUsPage extends IPageData {
    content: IContent;
  }

  export interface IContent {
    header: string;
    body: string;
  }
}