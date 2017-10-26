import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

import {MetaTags} from '../../core/services/meta-tags.service';
import {HomePage} from './home.model';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CalendlyComponent} from '../../modules/calendly/calendly.component';
import {PlatformCheckService} from '../../core/services/platform-check.service';
import {DOMAIN_URL} from '../../../main.config';
require('../../../assets/images/meta-logo-icon.png');
require('../../../assets/images/logo-og.png');

@Component({
  selector: 'fmp-home-component',
  templateUrl: 'home.component.html',
  styles: [require('./home.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public content: HomePage.IPageContent | null = null;
  public componentLoaded: boolean = false;

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private metaTagsService: MetaTags,
              private modalService: NgbModal,
              private router: Router,
              private platformCheckService: PlatformCheckService) {

    if (route.snapshot.data) {
      this.setSnapshotData(<HomePage.IHomePage>(route.snapshot.data['pageData']));
    }
  }

  public ngOnInit(): void {
    if (this.platformCheckService.isBrowser) {
      this.componentLoaded = true;
    }
  }

  public openCalendly(): void {
    const modal: NgbModalRef = this.modalService.open(CalendlyComponent, {
      size: 'lg'
    });

    if (modal) {
      modal.componentInstance.type = 'career-finder-intro';
    }
  }

  public openCareerFinder(): void {
    this.router.navigate(['/career-finder']);
  }

  /**
   * Method to set incoming data to local variables
   * @param {HomePage.IHomePage} data
   */
  private setSnapshotData(data: HomePage.IHomePage): void {
    this.content = data.content;
    this.content.slider_header_description = "Schedule a call and learn how we find your next job";
    this.titleService.setTitle(data.seo_title);
    this.metaTagsService.setTitles(data.seo_title);
    this.metaTagsService.setDescription(data.description);
    this.metaTagsService.setImages(`${DOMAIN_URL}/src/assets/images/logo-og.png`);
  }
}
