import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

import {IProfile, ProfileTabMode} from './user-profile.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateISOParserFormatter} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import {IProfileModel} from './accordion-tabs/profile/accordion-tab-profile.model';
import {DatePipe} from '@angular/common';

@Injectable()
export class ProfileUtilities {

  /**
   * Method to parse model as array of strings
   * @param data
   * @param fields
   * @returns {any}
   */
  public static parseModel(data: any, fields: Array<string>): any {
    const model: any = {};
    fields.forEach((field: string) => {
      if (data[field] !== null) {
        model[field] = data[field];
      }
    });
    return model;
  }

  /**
   * Method to parse string date ot NgbDateStruct or struct to string
   * @param date
   * @returns {any}
   */
  public static parseBirthDate(date: NgbDateStruct | string): string | NgbDateStruct {
    const formatter: NgbDateISOParserFormatter = new NgbDateISOParserFormatter();

    if (date) {
      if (typeof date === 'object') {
        return formatter.format(<NgbDateStruct>date);
      } else {
        return formatter.parse(date.toString());
      }
    }
    return '';
  }

  /**
   * Create profile section model
   * @param content
   */
  public static createProfileSection(content: IProfile): IProfileModel {
    return {
      birth_date: content.birth_date,
      city: content.city,
      full_name: content.full_name,
      linkedin_url: content.linkedin_url,
      phone_number: content.phone_number,
      state: content.state,
      street_address: content.street_address,
      postal_code: content.postal_code,
      email: content.email
    };
  }

  public static checkForBlank(model: any): boolean {
    if (model) {
      return !Object.keys(model).some((key: string) => !!model[key]);
    }
    return false;
  }

  public static createObject(fields: Array<string>): any {
    let model: any = {};
    fields.forEach((field: string) => model[field] = '');
    return model;
  }

  /**
   * Method to change state of fields
   * @param mode
   * @param modelForm
   */
  public static changeModelMode(mode: ProfileTabMode, modelForm: FormGroup): void {
    const disable: boolean = mode === ProfileTabMode.VIEW;
    const controls: Object = modelForm.controls;

    Object.keys(controls)
      .filter((key: string) => controls.hasOwnProperty(key))
      .forEach((key: string) => {
        const control: AbstractControl = modelForm.get(key);
        disable ? control.disable() : control.enable();
      });
  }

  public static getDatesRangePeriod(maxOffset: number = 16, minOffset: number = 90): string {
    const currentDate: Date = new Date();
    const maxYear: number = (currentDate.getFullYear() - maxOffset);
    const minYear: number = maxYear - minOffset;
    return `${minYear}:${maxYear}`;
  }

  public static parseDateWithFormat(date: Date | string): string | null {
    if (!date) {
      return null;
    }
    if (date instanceof Date === false) {
      date = new Date(date.toString());
    }
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform((<Date>date).toDateString(), 'MM/dd/y');
  }

  public static checkDate(date: Date | string | null): Date | null | string {
    if (!date) {
      return null;
    }
    if (date instanceof Date) {
      return date;
    }
    return new Date(date);
  }
}