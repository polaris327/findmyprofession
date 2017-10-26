import {
  Component, Input, OnChanges, OnInit, Renderer2, SimpleChange, SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {ShareLinkService} from '../../../core/services/share.service';
import {PlatformCheckService} from '../../../core/services/platform-check.service';

@Component({
  selector: 'fmp-article-share-links-component',
  templateUrl: 'share-links.component.html',
  styles: [require('./share-links.scss').toString()],
  encapsulation: ViewEncapsulation.None
})
export class ShareLinksComponent implements OnChanges, OnInit {

  @Input()
  articleUrl: string;

  @Input()
  articleImageUrl: string;

  @Input()
  articleTitle: string;

  @Input()
  articleDescription: string;

  public errorMessage: string;

  public shareLink: string;

  public mailBodyLink: string;

  constructor(private shareLinksService: ShareLinkService,
              private domRenderer: Renderer2,
              private platformCheckService: PlatformCheckService) {}

  public ngOnChanges(changes: SimpleChanges) {
    const articleUrl: SimpleChange = changes['articleUrl'];
    if (articleUrl && articleUrl.currentValue) {
      this.shareLink = this.shareLinksService.getShareUrl('article' , this.articleUrl);
    }
    const articleTitle: SimpleChange = changes['articleUrl'];

    if (articleUrl && articleTitle && articleUrl.currentValue && articleTitle.currentValue) {
      this.mailBodyLink = ShareLinkService.getMailShareLink(this.articleTitle, this.articleUrl);
    }
  }

  public ngOnInit(): void {
    if (this.platformCheckService.isBrowser) {
      this.loadFacebookSdkScript();
    }
  }

  public shareToFacebook(): void {
    this.shareLinksService.shareToFacebook('article', this.articleUrl, this.articleDescription, this.articleImageUrl)
      .then(
        () => {},
        (error: any) => this.errorMessage = error
      );
  }

  public shareToTwitter(): void {
    this.shareLinksService.shareToTwitter('article', this.articleUrl, this.articleTitle);
  }

  public shareToLinkedIn(): void {
    this.shareLinksService.shareToLinkedIn(this.articleUrl , this.articleTitle , this.articleDescription , this.articleImageUrl);
  }

  private loadFacebookSdkScript(): void {
    if (window && !window['facebookSdkLoaded']) {
      const script: HTMLScriptElement = this.domRenderer.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = false;
      script.onload = () => {
        this.initConfig();
      };
      document.body.appendChild(script);
      window['facebookSdkLoaded'] = true;
    } else {
      this.initConfig();
    }
  }

  private initConfig(): void {
    this.shareLinksService.initFacebookConfig();
  }
}