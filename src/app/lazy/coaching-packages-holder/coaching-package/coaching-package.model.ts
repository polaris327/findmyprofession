import {IFmpPlanEntity} from '../../../modules/fmp-plans/fmp-plans.model';
import {IPageData} from '../../../core/models/page-data.model';
import {Testimonials} from '../../testimonials/testimonials.model';

export namespace ICoachingPackage {

  export interface IPage extends IPageData {
    content: IPageContent;
    link: string;
  }

  export interface IPageContent {
    sub_title: string;
    steps: Array<IStep>;
    body: string;
    slider: ISlider;
    testimonials: Array<Testimonials.ITestimonialEntity>;
    services: Array<IFmpPlanEntity>;
    packages: IPackages;
    other_services_title?: string;
    testimonials_title?: string;
  }

  export interface IStep {
    step: string;
    description: string;
  }

  export interface ISlider {
    slider_header_title: string;
    slider_header_description: string;
    slider_cost: number;
    packages_title: string;
    packages_list: Array<string>;
  }

  export interface IPackages {
    senior: IPackageEntity;
    executive: IPackageEntity;
    id: number;
  }

  export interface IPackageEntity {
    title: string;
    description: string;
    list: Array<string>;
    price: number;
  }
}