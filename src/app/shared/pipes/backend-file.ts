import { Pipe, PipeTransform } from '@angular/core';

import {DOMAIN_URL, PORT} from '../../../main.config';

@Pipe({ name: 'uploads' })
export class FileUploadPipe implements PipeTransform {
  private domain: string;
  constructor() {
    this.domain = DOMAIN_URL;
  }

  transform(url: string = ''): string {
    if (!url) {
      return url;
    }
    let dotsIndex: number = url.lastIndexOf(PORT.back.toString());
    if (dotsIndex !== -1) {
      return `${this.domain}/${url.substring(dotsIndex + PORT.back.toString().length + 1, url.length)}`;
    } else {
      return url;
    }
  }
}