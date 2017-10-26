import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PrivacyPolicyTerms} from './privacy-policy-terms.model';
import {MetaTags} from '../../core/services/meta-tags.service';
import {Title} from '@angular/platform-browser';

require('../../../assets/images/blue-bg/privacy.jpg');

@Component({
  selector: 'privacy-policy-terms-component',
  templateUrl: 'privacy-policy-terms.component.html',
  styles: [require('./privacy-policy-terms.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class PrivacyPolicyTermsComponent {

  public currentTab: string = 'Terms of Use';
  public subNavState: boolean = false;

  public pageContent: PrivacyPolicyTerms.IPage;

  constructor(private route: ActivatedRoute,
              private metaService: MetaTags,
              private titleService: Title) {
    const pageContent: PrivacyPolicyTerms.IPageContent = route.snapshot.data['pageContent'];
    if (pageContent) {
      this.titleService.setTitle(pageContent.title);
      this.metaService.setTitles(pageContent.seo_title);
      this.metaService.setDescription(pageContent.description);
      this.metaService.removeImageTags();
      this.pageContent = pageContent.content;
    }
  }

  public switchTab(tab: string): void {
    this.subNavState = false;
    this.currentTab = tab;
  }

  public toggleSubNav(): void {
    this.subNavState = !this.subNavState;
  }
}