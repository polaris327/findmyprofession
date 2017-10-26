import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TestimonialsService} from './testimonials.service';
import {Testimonials} from './testimonials.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MetaTags} from '../../core/services/meta-tags.service';
import {DOMAIN_URL} from '../../../main.config';

require('../../../assets/images/logo-company.png');

@Component({
  selector: 'testimonials-component',
  templateUrl: 'testimonials.component.html',
  styles: [require('./testimonials.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class TestimonialsComponent implements OnInit {

  public items: Array<Testimonials.ITestimonialEntity>;

  public content: Testimonials.ITestimonialsContent;

  public pageData: any;

  public collectionSize: number;
  public currentPage: number = 1;
  public defaultLimit: number = 8;
  public page: number = 1;

  public error: string;

  constructor(private testimonialsService: TestimonialsService,
              private route: ActivatedRoute,
              private metaService: MetaTags,
              private router: Router) {

    const params: any = route.snapshot.queryParams;

    this.currentPage = TestimonialsComponent.checkPage(params);

    const pageData: Testimonials.ITestimonialsPage = route.snapshot.data['pageData'];

    if (pageData) {
      this.content = pageData.content;
      this.metaService.setMetaTags(pageData);
      this.metaService.setImages(`${DOMAIN_URL}/src/assets/images/logo-company.png`);


      this.setTestimonials(pageData.testimonials);
    }

  }

  public ngOnInit() {
    this.route.queryParams
      .subscribe(
        (params: any) => {
          const page: number = TestimonialsComponent.checkPage(params);

          if (this.page !== page) {
            this.testimonialsService.getTestimonials({page})
              .subscribe(
                (response: Testimonials.ITestimonialsPage) => {
                  if (response) {
                    this.page = page;
                    this.setTestimonials(response.testimonials);
                  }
                }
              );
          }
        }
      );
  }

  public pageSelected(): void {
    this.router.navigate(['/testimonials'], { queryParams: { page: this.currentPage } });
  }

  private setTestimonials(testimonials: Testimonials.ITestimonialsResponse): void {
    if (testimonials) {
      this.items = testimonials.testimonials;
      this.collectionSize = testimonials.count * this.defaultLimit;
    }
  }

  private static checkPage(params: any): number {
    if (params && Number.isInteger(+params.page)) {
      return +params.page;
    }
    return 1;
  }
}
