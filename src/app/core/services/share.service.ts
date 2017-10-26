import {Injectable} from '@angular/core';

import {ShareFacebookConfig} from '../models/facebook.config';
import {FacebookService} from 'ngx-facebook';
import {PlatformCheckService} from './platform-check.service';
import {DOMAIN_URL} from '../../../main.config';

@Injectable()
export class ShareLinkService {

  private windowSettings: string = 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500';

  constructor(private faceBookService: FacebookService,
              private platformService: PlatformCheckService) {
  }

  public initFacebookConfig(): void {
    if (this.platformService.isBrowser) {
      this.faceBookService.init(ShareFacebookConfig);
    }
  }

  /**
   * Returns url of sharing video
   * @param type
   * @param id
   * @returns {string}
   */
  public getShareUrl(type: string, id: string): string {
    if (this.platformService.isBrowser) {
      const origin: string = window.location.origin;
      if (type === 'article') {
        return `${origin}/career-advice/${id}`;
      }
      return window.location.href;
    }
    return '';
  }

  /**
   * Open Twitter Sharing modal
   * @param type {feedback , profile}
   * @param id
   * @param text
   */
  public shareToTwitter(type: string, id: string, text: string): void {
    const url = this.getShareUrl(type, id);
    if (this.platformService.isBrowser) {
      const sharingUrl: string = `http://twitter.com/share?text=${text}&url=${url}`;
      window.open(sharingUrl, 'targetWindow',this.windowSettings);
    }
  }

  /**
   * Open Facebook Sharing modal
   * @param type
   * @param id
   * @param description
   * @param image
   * @returns {Promise<any>}
   */
  public shareToFacebook(type: string, id: string, description: string, image: string): Promise<any> {
    return this.faceBookService.ui({
      method: 'share',
      href: this.getShareUrl(type , id),
      description: description,
      picture: image
    });
  }

  /**
   *
   * @param url
   * @param title
   * @param description
   * @param image
   */
  public shareToLinkedIn(url: string , title: string, description: string, image: string): void {
    if (this.platformService.isBrowser) {
      url = `https://www.linkedin.com/shareArticle?mini=true&amp;url=${DOMAIN_URL + location.pathname}`;
      window.open(url,'targetWindow',this.windowSettings);
    }
  }

  public static getMailShareLink(title: string, slug: string): string {
    return `mailto:?&subject=${title}&body=${ShareLinkService.getMailBody(slug)}`;
  }

  /**
   * Method to get email body
   * @param {string} slug
   * @returns {string}
   */
  public static getMailBody(slug: string): string {
    return `Just read this awesome article I thought I would share with you! Check it out here: ${DOMAIN_URL}/career-advice/${slug}`;
  }
}
