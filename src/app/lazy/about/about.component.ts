import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AboutUs} from './about.model';
import {MetaTags} from '../../core/services/meta-tags.service';
import {DOMAIN_URL} from '../../../main.config';

require('../../../assets/images/blue-bg/about-us.jpg');

@Component({
  selector: 'fmp-about-component',
  templateUrl: 'about.component.html',
  styles: [require('./about.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class AboutComponent {

  public pageData: AboutUs.IContent;

  constructor(private route: ActivatedRoute,
              private metaService: MetaTags) {
    const data: AboutUs.IAboutUsPage = route.snapshot.data.page;

    if (data.content) {
      this.pageData = data.content;
    }

    this.metaService.setMetaTags(data);
    this.metaService.setImages(`${DOMAIN_URL}/src/assets/images/logo-og.png`);

  }
}