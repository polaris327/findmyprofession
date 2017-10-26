import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

import {IArticleType} from '../../lazy/career-advice/career-advice.model';

@Component({
  selector: 'fmp-career-advice-tabs',
  templateUrl: 'career-advice-tabs.component.html'
})

export class CareerAdviceTabsComponent implements AfterViewInit {

  @Input()
  isTop: boolean = false;

  @Input()
  articleCategories: Array<IArticleType> = [
    {
      title: 'All Articles',
      link: 'career-advice'
    },
    {
      title: 'LinkedIn',
      link: 'linkedin'
    },
    {
      title: 'Resume + Cover Letter',
      link: 'resume-cover-letter'
    },
    {
      title: 'Interviewing',
      link: 'interviewing'
    },
    {
      title: 'Job Search',
      link: 'job-search'
    }
  ];

  @Input()
  selectedPackage: string;

  @Output()
  onLinkClick: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onMenuOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  public subNavState: boolean = false;

  public ngAfterViewInit() {
    /**
     * Setting selected package if not exist
     */
    if (this.articleCategories && !this.selectedPackage && this.articleCategories[2]) {
      this.selectedPackage = this.articleCategories[2].link;
    }
  }

  public toggleSubNav(): void {
    this.subNavState = !this.subNavState;
    this.moveContent();
  }

  public openLink($event: MouseEvent, link: IArticleType): void {
    $event.preventDefault();
    this.selectedPackage = link.title;
    this.onLinkClick.emit(link.link);
  }

  public packageSelected(link: string): void {
    this.selectedPackage = link;
    this.subNavState = false;

    if (this.selectedPackage === link) {
      this.subNavState = false;
      this.onMenuOpen.emit(this.subNavState);
    } else {
      this.subNavState = true;
    }
  }

  public moveContent(): void {
    this.onMenuOpen.emit(this.subNavState);
  }
}