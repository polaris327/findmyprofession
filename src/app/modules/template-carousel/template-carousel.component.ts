import {
  AfterViewInit, ChangeDetectorRef, Component, EventEmitter,
  HostListener, Input, OnChanges, Output, SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import {PlatformCheckService} from '../../core/services/platform-check.service';

import {TemplateCarouselSpace} from './career-advice-slider-item/template-carousel.model';
import TYPE_HOME = TemplateCarouselSpace.TYPE_HOME;
import TYPE_ADVICE = TemplateCarouselSpace.TYPE_ADVICE;
import TYPE_SERVICE = TemplateCarouselSpace.TYPE_SERVICE;
import {MODE_DESK, MODE_MOB} from '../../core/models/core.model';
import {ArticleLikeEvent, ArticleOpenEvent} from '../articles-cards/article-preview/article-preview.model';
import {Router} from '@angular/router';

@Component({
  selector: 'fmp-template-carousel-component',
  templateUrl: 'template-carousel.component.html',
  styles: [require('./template-carousel.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class TemplateCarousel implements AfterViewInit, OnChanges {

  @Input()
  type: string;

  @Input()
  title: string;

  @Input()
  subTitle: string;

  @Input()
  sliderItems: Array<any>;

  @Input()
  slidesNumber: number = 6;

  @Input()
  transitionTime: number = 2000;

  @Output()
  onLikeToggle: EventEmitter<ArticleLikeEvent> = new EventEmitter<ArticleLikeEvent>();

  @Output()
  onTestimonialOpen: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  openArticle: EventEmitter<ArticleOpenEvent> = new EventEmitter<ArticleOpenEvent>();

  public mode: string = MODE_MOB;

  public wrapWidth: number = null;
  private defaultWrapWidth: number = 1088;
  public marginLeft: number = 0;

  public currentStart: number = 0;

  public slides: Array<any>;

  public needTransition: boolean = false;

  public mediaPoint: number = 1025;

  public currentSlideNumber: number = 1;

  /**
   * Represent state of current carousel transition state , if now there's transition action
   * @type {boolean}
   */
  public isNowTransition: boolean = false;

  constructor(private changeDetector: ChangeDetectorRef,
              private platformService: PlatformCheckService,
              private router: Router) {

  }

  public ngOnChanges(changes: SimpleChanges): void {
    const itemsChange: SimpleChange = changes['sliderItems'];

    if (itemsChange && itemsChange.currentValue) {

      this.onResize();
      this.setInnerItems(this.sliderItems);

      if (this.mode !== MODE_MOB) {
        this.currentStart = -1;
        this.marginLeft = -1 * (this.wrapWidth || this.defaultWrapWidth);
      }

      this.getCurrentPage();
      this.changeDetector.detectChanges()
    }
  }

  public ngAfterViewInit() {
    if (this.platformService.isBrowser) {
      this.onResize();
    }
  }

  public ngOnDestroy() {
    this.changeDetector.detach();
  }

  public toggleLike($state: boolean, item: any): void {
    const callBack: Function = (item: any, state: boolean) => {
      item.liked = state;
    };
    const revert: Function = (item: any, state: boolean) => {
      if (item.liked === state) {
        item.liked = !state;
      }
    };
    this.onLikeToggle.emit({
      state: $state,
      id: item.id,
      callback: callBack.bind(this, item, $state),
      revertCallback: revert.bind(this, item, $state)
    });
  }

  public openCareerAdviceArticle($event: ArticleOpenEvent): void {
    this.openArticle.emit($event);
  }

  public goLeft(): void {
    this.transitionStart();

    this.marginLeft += this.wrapWidth;
    this.currentStart++;
    this.enableTransition();
    this.getCurrentPage();

    if (this.mode === MODE_DESK) {
      if (this.currentStart === 0) {
        this.executeTimeout(() => {
          this.disableTransition();
          this.currentStart = -1 * this.slidesNumber;
          this.marginLeft = this.wrapWidth * -1 * this.slidesNumber;
        });
      }
    } else {
      if (this.currentStart === 0) {
        this.executeTimeout(() => {
          this.disableTransition();
          this.currentStart = -1 * this.slidesNumber;
          this.marginLeft = this.wrapWidth * -1 * this.slidesNumber;
          this.getCurrentPage();
        });
      }
    }
  }

  public goRight(): void {
    this.transitionStart();

    this.currentStart--;
    this.marginLeft -= this.wrapWidth;
    this.enableTransition();
    this.getCurrentPage();

    if (this.mode === MODE_DESK) {
      if (this.currentStart === -1 * (this.slidesNumber + 1)) {
        this.gotRightTimeout();
      }
    } else {
      if (this.currentStart + 1 === (-1 * this.slidesNumber)) {
        this.gotRightTimeout();
      }
    }
  }

  private gotRightTimeout(): void {
    this.executeTimeout(() => {
      this.disableTransition();
      this.currentStart = -1;
      this.calculateMargin();
    });
  }

  @HostListener('window:resize')
  public onResize(): void {
    if (this.platformService.isBrowser) {
      const oldValue: boolean = this.needTransition;
      this.needTransition = false;
      const width: number = window.innerWidth;

      if (width > 1320) {
        this.wrapWidth = this.defaultWrapWidth;
      } else if (width > 1024) {
        this.wrapWidth = (width - 116 * 2);
      } else {
        this.wrapWidth = width;
      }
      if (width >= this.mediaPoint) {
        this.mode = MODE_DESK;
      } else {
        this.mode = MODE_MOB;
      }

      if (this.type === TYPE_ADVICE) {
        if (width <= 1340) {
          this.wrapWidth = width - 20;
        }
        if (width >= 1341) {
          this.wrapWidth = 1320;
        }
      }

      this.calculateMargin();
      this.needTransition = oldValue;
      this.changeDetector.detectChanges();
    }
  }

  /**
   * Method to open selected testimonial
   * @param $testimonial
   */
  public openExistTestimonial($testimonial: any): void {
    this.onTestimonialOpen.emit($testimonial);
  }

  private calculateMargin(): void {
    this.marginLeft = -1 * (this.wrapWidth || this.defaultWrapWidth);
  }

  /**
   * Method to detect start and stop of transition
   */
  private transitionStart(): void {
    this.executeTimeout(() => this.isNowTransition = false, () => this.isNowTransition = true)
  }

  /**
   * Method to recalculate current slide number
   */
  private getCurrentPage(): void {
    let abs: number = Math.abs(this.currentStart);
    if (abs > this.slidesNumber) {
      abs = 1;
    } else if (abs === 0) {
      abs = this.slidesNumber;
    }
    this.currentSlideNumber = abs;
  }

  /**
   *
   * @param innerCallback
   * @param beforeCallback
   */
  private executeTimeout(innerCallback: Function, beforeCallback?: Function): void {
    if (beforeCallback) {
      beforeCallback();
    }
    setTimeout(() => {
      if (innerCallback) {
        innerCallback();
      }
    }, this.transitionTime);
  }

  /**
   * Method to set local items
   * @param items
   */
  private setInnerItems(items: Array<any> = []): void {
    if (this.type !== TYPE_HOME && items.length % 2 !== 0 && items.length > 4) {
      items = [...items.slice(0, items.length - 1)];
      this.slidesNumber = items.length / 2;
    }
    const length: number = items.length;

    if (this.type === TYPE_HOME) {
      this.slides = [
        items[length - 1],
        ...items,
        items[0]
      ];
    } else if (this.type === TYPE_SERVICE) {
      this.slides = [
        items[length - 2],
        items[length - 1],
        ...items,
        ...items.slice(0, 2)
      ];
    } else if (this.type === TYPE_ADVICE) {
      if (this.mode === MODE_DESK) {
        this.slides = [
          items[length - 2],
          items[length - 1],
          ...items,
          ...items.slice(0, 2)
        ];
      } else {
        this.slides = [
          items[length - 1],
          ...items,
          items[0]
        ];
        this.slidesNumber = length;
        this.currentStart = -1;
      }
    }
    this.slides.forEach((slide: any, index: number) => slide.index = index);
  }

  private disableTransition(): void {
    this.needTransition = false;
  }

  private enableTransition(): void {
    this.needTransition = true;
  }
}