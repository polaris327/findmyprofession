import {IPageData} from '../../core/models/page-data.model';

export namespace Testimonials {

  export interface ITestimonialsPage extends IPageData {
    content: ITestimonialsContent;

    testimonials: ITestimonialsResponse;
  }

  export interface ITestimonialsContent {
    title: string;
    sub_title: string;
  }

  export interface ITestimonialEntity {
    readonly id?: number;
    name: string;
    avatar: string;
    help_with: string;
    date: string;
    rating: number;
    detail: string;
    industry?: string;
    age?: number;
    service: ITestimonialsService;
  }

  export interface ITestimonialsService {
    name: string;
    link: string;
  }
  export interface ITestimonialsRequest {
    page: number;
    limit?: number;
  }
  export interface ITestimonialsResponse {
    count: number;
    testimonials: Array<ITestimonialEntity>;
  }

}