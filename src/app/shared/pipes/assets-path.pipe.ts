import { Pipe, PipeTransform } from '@angular/core';

import {DOMAIN_URL} from '../../../main.config';

@Pipe({ name: 'assets' })
export class AssetsPathPipe implements PipeTransform {
  public transform(url: string = ''): string {
    if (!url) {
      return url;
    }
    return `${DOMAIN_URL}/${url}`;
  }
}