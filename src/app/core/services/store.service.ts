import {Injectable} from '@angular/core';

import {MemoryService} from './memory.service';

@Injectable()
export class StoreService {
  constructor(private memoryService: MemoryService) {
  }

  public getItem(key: string): any {
    try {
      return JSON.parse(sessionStorage.getItem(key)) || JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return JSON.parse(this.memoryService.getItem(key));
    }
  }

  public setItem(key: string, valueObj: any, remember: boolean = true) {
    try {
      if (remember) {
        localStorage.setItem(key, JSON.stringify(valueObj));
      } else {
        sessionStorage.setItem(key, JSON.stringify(valueObj));
      }
    } catch (err) {
      this.memoryService.setItem(key, JSON.stringify(valueObj));
    }
  }

  public removeItem(key: string) {
    try {
      sessionStorage.removeItem(key);
      localStorage .removeItem(key);
    } catch (err) {
      this.memoryService.removeItem(key);
    }
  }
}
