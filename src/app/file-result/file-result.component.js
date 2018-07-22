"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var FileResultComponent = (function () {
    function FileResultComponent(reviewService) {
        this.reviewService = reviewService;
        this.index = 0;
    }
    FileResultComponent.prototype.ngOnInit = function () {
        this.classify();
    };
    FileResultComponent.prototype.classify = function () {
        var _this = this;
        this.reviewService.getFileClassificationByJson(this.reviewService.reviews[this.index])
            .subscribe(function (response) { return _this.updateScore(response); }, function (error) { return console.log(error); });
    };
    FileResultComponent.prototype.updateScore = function (response) {
        console.log(response.text, " ", response.result);
        this.index = this.index + 1;
        if (this.index < this.reviewService.reviews.length) {
            this.classify();
        }
    };
    FileResultComponent = __decorate([
        core_1.Component({
            selector: 'app-file-result',
            templateUrl: './file-result.component.html',
            styleUrls: ['./file-result.component.css']
        })
    ], FileResultComponent);
    return FileResultComponent;
}());
exports.FileResultComponent = FileResultComponent;
