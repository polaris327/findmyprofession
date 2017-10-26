import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class PlatformCheckService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Check if current platform is browser
   * @returns {boolean}
   */
  public get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}