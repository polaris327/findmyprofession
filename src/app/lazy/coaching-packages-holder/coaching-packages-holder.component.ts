import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CoachingServiceEntity} from './coaching-services-holder.model';
import {Observable} from 'rxjs/Observable';

require('../../../assets/images/blue-bg/career-finder.jpg');
require('../../../assets/images/blue-bg/resume-makeover.jpg');
require('../../../assets/images/blue-bg/cover-letter-service.jpg');
require('../../../assets/images/blue-bg/linkedin-profile-makeover.jpg');
require('../../../assets/images/blue-bg/job-interview-prep.jpg');

@Component({
  selector: 'coaching-packages-holder-component',
  templateUrl: 'coaching-packages-holder.component.html'
})
export class CoachingPackagesHolderComponent {

  public backImage: string = 'career-finder';
  public subNavState: boolean = false;

  public selectedService: string;
  public selectedPackage: string = 'Career Finder';

  public coachingServices: Array<CoachingServiceEntity>;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    const list: Array<CoachingServiceEntity> = route.snapshot.data['list'];
    if (Array.isArray(list)) {
      this.coachingServices = list;
    }

    const service: CoachingServiceEntity = list.find((element: CoachingServiceEntity) => router.url.includes(element.link));

    if (service) {
      this.backImage = this.router.url.toString().replace('/', '');
      this.selectedService = service.name;
      this.selectedPackage = service.name;
    }
  }

  public selectBackImage(id: string): void {
    this.backImage = id;
  }

  public packageSelected(link: CoachingServiceEntity): void {
    this.selectedPackage = link.name;
    this.selectedService = link.name;
    this.subNavState = false;
  }

  public toggleSubNav(): void {
    this.selectedPackage = '';
    this.subNavState = !this.subNavState;
  }

  public clickLink(event: MouseEvent, link: CoachingServiceEntity): void {
    event.preventDefault();
    this.checkForClose(link.name);
    this.openLink(link);
  }

  public touchLink(event: TouchEvent, link: CoachingServiceEntity): void {
    event.preventDefault();
    this.checkForClose(link.name);
    this.openLink(link);
  }

  private checkForClose(link: string): void {
    if (this.selectedService === link) {
      this.subNavState = false;
      this.selectedPackage = link;
    }
  }

  private openLink(link: CoachingServiceEntity): void {
    Observable.fromPromise(this.router.navigate([`/${link.link}`]))
      .filter((state: boolean) => state)
      .subscribe(() => this.packageSelected(link))
  }
}