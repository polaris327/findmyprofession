import {Injectable} from '@angular/core';
import {PlatformCheckService} from './platform-check.service';
import {parse, Url} from 'url';

const FileSaver = require('file-saver');

@Injectable()
export class CoreUtilitiesService {

  constructor(private platformService: PlatformCheckService) {}

  public openArticleInNewTab(articleUrl: string): void {
    if (this.platformService.isBrowser) {
      const newWindowName: string = `window${Math.random()}`;
      window.open(`${location.origin}/career-advice/${articleUrl}`, newWindowName, '_target');
    }
  }

  public static fileFormats: Array<string> = [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf',
    'text/plain',
    'application/rtf',
    'image/png',
    'image/jpeg'
  ];

  public static fileAcceptFormats: Array<string> = [
    '.docx',
    '.doc',
    '.pdf',
    '.rtf',
    '.txt',
    '.png',
    '.jpeg',
    '.jpg'
  ];

  /**
   * Method to save file from server
   * @param data
   * @param fileName
   */
  public static saveFile(data: any, fileName: string){
    const blob: Blob = new Blob([data]);
    FileSaver.saveAs(blob, fileName);
  }

  public static checkFileExtension(file: File): boolean {
    return file ? CoreUtilitiesService.fileFormats.some((ext: string) =>  ext === file.type) : false;
  }

  public detectEdge(): boolean {
    return this.detectBrowser('Edge/');
  }

  public detectFirefox(): boolean {
    return this.detectBrowser('Firefox');
  }

  private detectBrowser(type: string): boolean {
    if (this.platformService.isBrowser) {
      const agent: string = window.navigator.userAgent;
      return agent.indexOf(type) > 0;
    }
    return false;
  }

  public static parseMessage(message: string): string {
    return message.replace(/\n/g, '<br/>');
  }

  /**
   * Method to parse job link
   * @param {string} link
   * @returns {string}
   */
  public static parseJobLink(link: string): string {
    const parsedUrl: Url = parse(link);
    return `${parsedUrl.protocol}//${parsedUrl.host}`;
  }

  public static removeSpaces(str: string = ''): string {
    return str.replace(/\s/g, '');
  }

  public static removeTrallingSlash(str: string = ''): string {
    return str.replace(/\/$/, "");
  }

  public static getTimeZone(): string {
    const offsetInHours: number = -new Date().getTimezoneOffset() / 60;
    return `GMT${offsetInHours > 0? '+' : ''}${offsetInHours}`;
  }
}