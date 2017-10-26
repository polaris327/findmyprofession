var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
var CustomRangeComponent = /** @class */ (function () {
    function CustomRangeComponent() {
        this.onCostChange = new EventEmitter();
        this.keys = [
            'Backspace',
            'ArrowLeft',
            'ArrowRight',
            'Delete'
        ];
        this.customRange = {
            minValue: 100000,
            maxValue: 1000000,
            step: 5000,
            startValue: 100000,
            fee: 0.01,
            minRevenue: 1000
        };
    }
    CustomRangeComponent.prototype.ngOnChanges = function () {
        if (this.percent) {
            this.customRange.fee = this.percent / 100;
            this.customRange.minRevenue *= this.percent;
            this.setNewValue(this.customRange.startValue);
            this.customRange.startValue = this.percent * this.customRange.minRevenue * 1000;
        }
        if (this.currentValue) {
            this.customRange.startValue = (this.currentValue || 1000) * 100;
            this.setNewValue(this.customRange.startValue);
        }
    };
    CustomRangeComponent.prototype.setValue = function (e) {
        if (this.rootProgressBar && this.rootProgressBar.nativeElement && this.rootProgressBar.nativeElement.offsetWidth) {
            var blockWidth = this.rootProgressBar.nativeElement.offsetWidth;
            var value = Math.round((e.offsetX / blockWidth) * (this.customRange.maxValue / 1000)) * 1000;
            this.setNewValue(value);
        }
    };
    CustomRangeComponent.prototype.setNewValue = function (value) {
        if (value === void 0) { value = 0; }
        if ((value * this.customRange.fee) > this.customRange.minRevenue) {
            this.customRange.currentValue = value;
            this.calculateProgressBarWidth(+value, this.customRange.maxValue);
            this.calculateCost(+value);
        }
        else {
            this.customRange.currentValue = value;
            this.calculateProgressBarWidth(+value, this.customRange.maxValue);
            this.calculateCost(this.customRange.minRevenue / this.customRange.fee);
        }
    };
    CustomRangeComponent.prototype.calculateCost = function (value) {
        this.customRange.price = Math.round(this.getCost(value, this.customRange.fee));
        this.onCostChange.emit(this.customRange.price);
    };
    CustomRangeComponent.prototype.getCost = function (value, percent) {
        return value * percent;
    };
    CustomRangeComponent.prototype.calculateProgressBarWidth = function (value, _maxValue) {
        if (!Number.isNaN(+value)) {
            value -= this.customRange.minValue;
            var percent = (value * 100) / _maxValue;
            if (percent < 10) {
                percent += 0.6;
            }
            else if (percent > 90) {
                percent -= 0.6;
            }
            percent += value / this.customRange.minValue;
            this.customRange.progressWidth = percent;
        }
    };
    CustomRangeComponent.prototype.inputValueChanged = function (e) {
        var borderWidth = Number.parseInt(getComputedStyle(this.rootProgressBar.nativeElement).borderTopWidth) || 0;
        var padding = Math.floor((e.target['clientHeight'] - this.rootProgressBar.nativeElement.offsetHeight) / 2) - borderWidth * 2;
        if (e.offsetY < padding || e.offsetY > padding + this.rootProgressBar.nativeElement.offsetHeight) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
    };
    CustomRangeComponent.prototype.valueInput = function (value) {
        /**
         * Check if current value is number
         */
        if (!Number.isNaN(+value)) {
            if (+value < this.customRange.minValue || +value > this.customRange.maxValue) {
                if (+value < this.customRange.minValue) {
                    this.customRange.currentValue = this.customRange.minValue;
                }
                else {
                    this.customRange.currentValue = this.customRange.maxValue;
                }
            }
            else {
                this.customRange.currentValue = Math.round(+value / this.customRange.step) * this.customRange.step;
            }
            this.setNewValue(this.customRange.currentValue);
        }
    };
    /**
     * Detect enter KeyUp event
     * @param event
     */
    CustomRangeComponent.prototype.keyEntered = function (event) {
        if (event.key === 'Enter') {
            if (event.target['value'] > this.customRange.maxValue) {
                event.preventDefault();
                event.target['value'] = this.customRange.maxValue;
                this.customRange.currentValue = this.customRange.maxValue;
                this.valueInput(this.customRange.maxValue);
                return false;
            }
            this.valueInput(event.target['value']);
        }
        else if (Number.isNaN(+event.key) && !this.keys.some(function (key) { return key === event.key; })) {
            event.preventDefault();
            return false;
        }
    };
    __decorate([
        ViewChild('rootProgressBar'),
        __metadata("design:type", Object)
    ], CustomRangeComponent.prototype, "rootProgressBar", void 0);
    __decorate([
        ViewChild('input'),
        __metadata("design:type", Object)
    ], CustomRangeComponent.prototype, "input", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CustomRangeComponent.prototype, "percent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CustomRangeComponent.prototype, "currentValue", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], CustomRangeComponent.prototype, "onCostChange", void 0);
    CustomRangeComponent = __decorate([
        Component({
            selector: 'fmp-custom-range-component',
            templateUrl: 'custom-range.component.html',
            styles: [require('./custom-range.component.scss').toString()]
        }),
        __metadata("design:paramtypes", [])
    ], CustomRangeComponent);
    return CustomRangeComponent;
}());
export { CustomRangeComponent };
