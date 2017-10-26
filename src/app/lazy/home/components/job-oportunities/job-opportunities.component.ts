import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

import {IJobOpportunity} from './job-opportunities.model';

require('../../../../../assets/images/job-opportunities/amazon.jpg');
require('../../../../../assets/images/job-opportunities/bank-of-america.jpg');
require('../../../../../assets/images/job-opportunities/bed-bath.jpg');
require('../../../../../assets/images/job-opportunities/chevron.jpg');
require('../../../../../assets/images/job-opportunities/fitbit.jpg');
require('../../../../../assets/images/job-opportunities/google.jpg');
require('../../../../../assets/images/job-opportunities/indeed.jpg');
require('../../../../../assets/images/job-opportunities/kaiser.jpg');
require('../../../../../assets/images/job-opportunities/mercedes.jpg');
require('../../../../../assets/images/job-opportunities/northrop.jpg');
require('../../../../../assets/images/job-opportunities/pepsi.jpg');
require('../../../../../assets/images/job-opportunities/ups.jpg');

@Component({
  selector: 'fmp-job-opportunities-component',
  templateUrl: 'job-opportunities.component.html',
  styles: [require('./job-opportunities.component.scss').toString()],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeJobOpportunitiesComponent {

  @Input()
  title: string;

  @Input()
  description: string;

  public opportunities: Array<IJobOpportunity> = [
    {
      src: 'amazon',
      alt: 'Amazon',
      title: 'Amazon'
    },
    {
      src: 'bank-of-america',
      alt: 'boa',
      title: 'boa'
    },
    {
      src: 'bed-bath',
      alt: 'bedbath',
      title: 'bedbath'
    },
    {
      src: 'chevron',
      alt: 'Chevron',
      title: 'Chevron'
    },
    {
      src: 'fitbit',
      alt: 'fitbit',
      title: 'fitbit'
    },
    {
      src: 'google',
      alt: 'google',
      title: 'google'
    },
    {
      src: 'indeed',
      alt: 'indeed',
      title: 'indeed'
    },
    {
      src: 'kaiser',
      alt: 'kiser',
      title: 'kiser'
    },
    {
      src: 'mercedes',
      alt: 'mercedes',
      title: 'mercedes'
    },
    {
      src: 'northrop',
      alt: 'northrop',
      title: 'northrop'
    },
    {
      src: 'pepsi',
      alt: 'pepsico',
      title: 'pepsico'
    },
    {
      src: 'ups',
      alt: 'ups',
      title: 'ups'
    }
  ];
}