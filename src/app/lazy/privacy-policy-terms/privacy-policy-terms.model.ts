import {IPageData} from '../../core/models/page-data.model';

export namespace PrivacyPolicyTerms {
  export interface IPageContent extends IPageData {
    content: IPage;
  }
  export interface IPage {
    terms_of_use: ISingleContent;
    privacy_policy: ISingleContent
  }
  export interface ISingleContent {
    content: string;
    title: string
  }
}