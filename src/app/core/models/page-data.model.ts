export interface IPageData {
  /**
   * Root title of page
   */
  readonly title: string;

  readonly metaData: any;

  readonly seo_title?: string;

  readonly description?: string;

  readonly image?: string;
}