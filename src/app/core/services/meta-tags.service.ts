import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {IPageData} from '../models/page-data.model';
import {FileUploadPipe} from '../../shared/pipes/backend-file';

/**
 * Service to update meta tags
 */
@Injectable()
export class MetaTags {

  private helpTags: Array<string> = [
    'og:locale',
    'og:type',
    'og:url',
    'og:site_name',
    'twitter:card'
  ];

  private titleTagas: Array<string> = [
    'title',
    'og:title',
    'twitter:title'
  ];

  private descriptionTags: Array<string> = [
    'description',
    'og:description',
    'twitter:description'
  ];

  private imageTags: Array<string> = [
    'og:image',
    'twitter:image'
  ];

  constructor(private metaService: Meta,
              private titleService: Title) {
  }

  public setTags(tags: Object): void {
    if (tags) {
      for (const key in tags) {
        if (tags.hasOwnProperty(key)) {
          this.metaService.updateTag({
            name: key,
            content: tags[key]
          }, `name="${key}"`);
        }
      }
    }
  }

  /**
   * Method to remove tag by it's name
   * @param {string} tagName
   */
  public removeTag(tagName: string): void {
    if (tagName) {
      const tagProperty: string = tagName.includes('og:') ? 'property' : 'name';
      this.metaService.removeTag(`${tagProperty}='${tagName}'`);
    }
  }

  public removeImageTags(): void {
    this.removeTagsArray(this.imageTags);
  }

  public removeTitleTags(): void {
    this.removeTagsArray(this.titleTagas);
  }

  public removeDescriptionTags(): void {
    this.removeTagsArray(this.descriptionTags);
  }

  public removeHelpTags(): void {
    this.removeTagsArray(this.helpTags);
  }

  public removeAllMetaTags(): void {
    this.removeImageTags();
    this.removeTitleTags();
    this.removeDescriptionTags();
    this.removeHelpTags();
  }

  public setMetaTags(page: IPageData): void {
    const pipe: FileUploadPipe = new FileUploadPipe();

    let image: string = page.image;
    if (image) {
      image = pipe.transform(image);
      this.setImages(image);
    } else {
      this.removeImageTags();
    }

    this.setTitles(page.seo_title);
    this.setDescription(page.description);
    this.setTitle(page.title);
  }

  /**
   * Method to set og:url
   * @param {string} url
   */
  public setUrl(url: string): void {
    if (url) {
      this.metaService.updateTag({
        property: 'og:url',
        content: url
      }, `property="og:url"`);
    }
  }

  public setImages(image: string): void {
    image ? this._setTags(image, this.imageTags) : this.removeImageTags();
  }

  public setTitles(title: string): void {
    title ? this._setTags(title, this.titleTagas) : this.removeTitleTags();
  }

  public setDescription(description: string): void {
    description ? this._setTags(description, this.descriptionTags) : this.removeDescriptionTags();
  }

  public setTitle(title: string): void {
    if (title) {
      title = title.replace(/\&amp;/g,'&');
      this.titleService.setTitle(decodeURI(title));
    }
  }

  private removeTagsArray(tags: Array<string>): void {
    tags.forEach((tagName: string) => this.removeTag(tagName));
  }

  private _setTags(value: string, tags: Array<string>): void {
    if (value && Array.isArray(tags)) {
      tags.forEach((tag: string) => {
        if (tag && tag.includes('og:')) {
          this.metaService.updateTag({
            property: tag,
            content: value
          }, `property="${tag}"`);
        }
        else {
          this.metaService.updateTag({
            name: tag,
            content: value
          }, `name="${tag}"`);
        }
      });
    }
  }
}
