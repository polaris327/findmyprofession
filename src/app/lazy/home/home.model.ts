import {IPageData} from '../../core/models/page-data.model';

export namespace HomePage {

  export interface IHomePage extends IPageData{
    content: IPageContent;
  }

  export interface IPageContent {
    page_header_title: string;
    page_header_description: string;

    slider_header_title: string;
    slider_header_description: string;

    packages_title: string;
    packages_list: Array<string>;

    slider_footer_text: string;
    slider_cost: number;

    image_header_title: string;
    image_header_description: string;
    image_list: Array<IImage>;

    opportunities_title: string;
    opportunities_description: string;

    calendly_title: string;
    calendly_description: string;

    testimonials_title: string;
    testimonials_description: string;
    testimonials: Array<ITestimonial>;

    other_services_title: string;
    other_services_description: string;
    other_services: Array<IServicePlan>;
  }

  export interface IImage {
    image: string;
    title: string;
    description: string;
  }

  export interface ITestimonial {
    detail: string;
    name: string;
  }

  export interface IServicePlan {
    name: string;
    icon: string;
    link: string;
    description?: string;
  }
}
