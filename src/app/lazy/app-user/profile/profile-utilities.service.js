var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { ProfileTabMode } from './user-profile.model';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { DatePipe } from '@angular/common';
var ProfileUtilities = /** @class */ (function () {
    function ProfileUtilities() {
    }
    /**
     * Method to parse model as array of strings
     * @param data
     * @param fields
     * @returns {any}
     */
    ProfileUtilities.parseModel = function (data, fields) {
        var model = {};
        fields.forEach(function (field) {
            if (data[field] !== null) {
                model[field] = data[field];
            }
        });
        return model;
    };
    /**
     * Method to parse string date ot NgbDateStruct or struct to string
     * @param date
     * @returns {any}
     */
    ProfileUtilities.parseBirthDate = function (date) {
        var formatter = new NgbDateISOParserFormatter();
        if (date) {
            if (typeof date === 'object') {
                return formatter.format(date);
            }
            else {
                return formatter.parse(date.toString());
            }
        }
        return '';
    };
    /**
     * Create profile section model
     * @param content
     */
    ProfileUtilities.createProfileSection = function (content) {
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
    };
    ProfileUtilities.checkForBlank = function (model) {
        if (model) {
            return !Object.keys(model).some(function (key) { return !!model[key]; });
        }
        return false;
    };
    ProfileUtilities.createObject = function (fields) {
        var model = {};
        fields.forEach(function (field) { return model[field] = ''; });
        return model;
    };
    /**
     * Method to change state of fields
     * @param mode
     * @param modelForm
     */
    ProfileUtilities.changeModelMode = function (mode, modelForm) {
        var disable = mode === ProfileTabMode.VIEW;
        var controls = modelForm.controls;
        Object.keys(controls)
            .filter(function (key) { return controls.hasOwnProperty(key); })
            .forEach(function (key) {
            var control = modelForm.get(key);
            disable ? control.disable() : control.enable();
        });
    };
    ProfileUtilities.getDatesRangePeriod = function (maxOffset, minOffset) {
        if (maxOffset === void 0) { maxOffset = 16; }
        if (minOffset === void 0) { minOffset = 90; }
        var currentDate = new Date();
        var maxYear = (currentDate.getFullYear() - maxOffset);
        var minYear = maxYear - minOffset;
        return minYear + ":" + maxYear;
    };
    ProfileUtilities.parseDateWithFormat = function (date) {
        if (!date) {
            return null;
        }
        if (date instanceof Date === false) {
            date = new Date(date.toString());
        }
        var datePipe = new DatePipe('en-US');
        return datePipe.transform(date.toDateString(), 'MM/dd/y');
    };
    ProfileUtilities.checkDate = function (date) {
        if (!date) {
            return null;
        }
        if (date instanceof Date) {
            return date;
        }
        return new Date(date);
    };
    ProfileUtilities = __decorate([
        Injectable()
    ], ProfileUtilities);
    return ProfileUtilities;
}());
export { ProfileUtilities };
