import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IFaq} from './faq.model';
import {MetaTags} from '../../core/services/meta-tags.service';

require('../../../assets/images/blue-bg/faq.jpg');

@Component({
  selector: 'faq-component',
  templateUrl: 'faq.component.html'
})
export class FaqComponent {

  public pageData: IFaq.IFaqContent;

  constructor(private route: ActivatedRoute,
              private metaService: MetaTags) {
    const data: IFaq.IFaqPage = route.snapshot.data['pageData'];
    if (data) {
      this.pageData = data.content;

      this.metaService.setMetaTags(data);
    }
  }
}