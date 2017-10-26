import {Component, ViewEncapsulation} from '@angular/core';
import {APP_CONFIG} from '../../core/models/app.config';

@Component({
  selector: 'fmp-social-links-component',
  templateUrl: 'social-links.component.html',
  styles: [require('./social-links.component.scss').toString()],
  encapsulation: ViewEncapsulation.None
})

export class SocialLinksComponent {

  public facebook: string;
  public likedIn: string;
  public twitter: string;

  constructor() {
    this.facebook = APP_CONFIG.facebookLink;
    this.likedIn = APP_CONFIG.linkedInkLink;
    this.twitter = APP_CONFIG.twitterLink;
  }
}