import {Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MetaTags} from '../../../core/services/meta-tags.service';
import {ICoachingPackage} from './coaching-package.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {IBasketItem} from '../../../core/models/basket.model';
import {BasketService} from '../../../core/services/basket.service';
import {CalendlyComponent} from '../../../modules/calendly/calendly.component';
import {PaymentService} from '../../../core/services/payment.service';
import {ResizeModeService} from '../../../core/services/resize-mode.service';
import {MODE_MOB} from '../../../core/models/core.model';
import {TestimonialModalComponent} from '../../../modules/testimonial-modal/testimonial-modal.component';
import {Subject} from 'rxjs/Subject';

require('../../../../assets/images/sprite.svg');
require('../../../../assets/images/sprite2.svg');

@Component({
  selector: 'coaching-package-component',
  templateUrl: 'coaching-package.component.html',
  styles: [require('./coaching-package.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class CoachingPackageComponent implements OnDestroy {

  @ViewChild('article')
  articleElement: ElementRef;

  public content: ICoachingPackage.IPageContent;
  public page: ICoachingPackage.IPage;
  public packageId: number = 0;

  /**
   * Truncate pipe settings
   * @type {number}
   */
  public readonly defaultTuncateValue: number = 500;
  public isTruncateOpen: boolean = false;
  public currentTruncateLimit: number;
  private bodyLength: number;

  public isMobileMode: boolean = false;

  public basket: any = {
    senior: false,
    executive: false
  };

  private destroyed$: Subject<any> = new Subject<any>();

  constructor(private route: ActivatedRoute,
              private metaTagsService: MetaTags,
              private basketService: BasketService,
              private router: Router,
              private modalService: NgbModal,
              private paymentService: PaymentService,
              private resizeModeService: ResizeModeService) {

    this.setContent(route);

    this.subscribeToBasket();
    this.createResizeSub();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public toggleTruncate(): void {
    this.isTruncateOpen = !this.isTruncateOpen;

    if (this.isTruncateOpen) {
      this.currentTruncateLimit = this.bodyLength;
    } else {
      this.currentTruncateLimit = this.defaultTuncateValue;
      this.articleElement.nativeElement.scrollIntoView(true);
    }
  }

  public packageBuy(item: IBasketItem): void {
    item.title = this.page.title;
    item.icon = this.page.link;
    this.basketService.addNewItem(item);
    this.paymentService.updatePayment();
    this.router.navigate(['/checkout']);
  }

  private subscribeToBasket(): void {
    this.basketService.basket$
      .takeUntil(this.destroyed$)
      .subscribe(
        (basket: Array<IBasketItem>) =>
          basket
            .filter((item: IBasketItem) => item.id === this.packageId)
            .forEach((item: IBasketItem) => this.basket[item.plan.toLowerCase()] = true)
      );
  }

  public openCalendly(): void {
    const modal: NgbModalRef = this.modalService.open(CalendlyComponent, {
      size: 'lg'
    });
    modal.componentInstance.type = 'career-finder-intro';
  }

  public openTestimonialModal($testimonial: any): void {
    const modal: NgbModalRef = this.modalService.open(TestimonialModalComponent);
    modal.componentInstance.testimonial = $testimonial;
  }

  private createResizeSub(): void {
    this.resizeModeService.mode$
      .takeUntil(this.destroyed$)
      .subscribe(
        (mode: string) => this.handleResizeEvent(mode)
      );
  }

  private handleResizeEvent(mode: string): void {
    this.isMobileMode = (mode === MODE_MOB);
    if (this.isMobileMode) {
      this.isTruncateOpen = false;
      this.currentTruncateLimit = this.defaultTuncateValue;
    } else {
      this.isTruncateOpen = true;
      this.currentTruncateLimit = this.bodyLength;
    }
  }

  private setContent(route: ActivatedRoute): void {
    if (route.snapshot.data) {
      const data: ICoachingPackage.IPage = route.snapshot.data.pageData;
      this.page = data;
      if (data) {
        this.content = data.content;
        if (data.content.packages) {
          this.packageId = data.content.packages.id;
        } else {
          this.packageId = 1;
        }

        this.metaTagsService.setTitle(data.title);
        this.metaTagsService.setTitles(data.seo_title);
        this.metaTagsService.setDescription(data.description);
        this.metaTagsService.removeImageTags();

        if (data.content.body) {
          this.bodyLength = data.content.body.toString().length;
        }
      }
    }
  }
}