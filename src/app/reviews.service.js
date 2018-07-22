"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var http_1 = require('@angular/common/http');
var core_1 = require('@angular/core');
var rxjs_1 = require('rxjs');
var review_1 = require('./review');
var ReviewsService = (function () {
    function ReviewsService(http, router) {
        this.http = http;
        this.router = router;
        this.lock = false;
        this.finishRead = false;
        this.reviews = [];
        this.reader = new FileReader();
        this.review = new review_1.Review();
        this.Reviews = [
            { text: "לא טוב", algorithm: "KNN", classification: "-1" }
        ];
    }
    ReviewsService.prototype.getRev = function () {
        return rxjs_1.of(this.Reviews);
    };
    ReviewsService.prototype.getClassificationByJson = function () {
        this.term = "לא טוב";
        var parameters = new http_1.HttpParams();
        var param = new http_1.HttpParams()
            .set('text', this.review.text)
            .set('algorithm', this.review.algorithm);
        console.log(param);
        var options = this.term ?
            { params: param } : {};
        return this.http.get('/getClassificationByJson', options);
    };
    ReviewsService.prototype.getFileClassificationByJson = function (text) {
        console.log("here");
        this.term = "לא טוב";
        var parameters = new http_1.HttpParams();
        var param = new http_1.HttpParams()
            .set('text', text)
            .set('algorithm', this.review.algorithm);
        console.log(param);
        var options = this.term ?
            { params: param } : {};
        return this.http.get('/getClassificationByJson', options);
    };
    ReviewsService.prototype.checkIfValid = function () {
        if (this.review.text === undefined || !this.CheckHebrew()) {
            console.log(this.review.text);
            return false;
        }
        return true;
    };
    ReviewsService.prototype.CheckHebrew = function () {
        var position = this.review.text.search(/[\u0590-\u05FF]/);
        if (position >= 0) {
            return true;
        }
        return false;
    };
    ReviewsService.prototype.readFile = function (file) {
        var _this = this;
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var lines = fileReader.result.split('\n');
            console.log(lines);
            for (var line = 0; line < lines.length; line++) {
                _this.reviews.push(lines[line]);
            }
            _this.router.navigate(['/multiple']);
        };
        fileReader.readAsText(this.file);
    };
    ReviewsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReviewsService);
    return ReviewsService;
}());
exports.ReviewsService = ReviewsService;
