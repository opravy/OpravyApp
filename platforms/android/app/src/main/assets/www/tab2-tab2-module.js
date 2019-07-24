(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"],{

/***/ "./src/app/pages/tab2/tab2.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/tab2/tab2.module.ts ***!
  \*******************************************/
/*! exports provided: Tab2PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function() { return Tab2PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab2.page */ "./src/app/pages/tab2/tab2.page.ts");







var Tab2PageModule = /** @class */ (function () {
    function Tab2PageModule() {
    }
    Tab2PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"] }])
            ],
            declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"]]
        })
    ], Tab2PageModule);
    return Tab2PageModule;
}());



/***/ }),

/***/ "./src/app/pages/tab2/tab2.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/tab2/tab2.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\r\n  <ion-toolbar>\r\n    <ion-title>\r\n      Reportes\r\n    </ion-title>\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ng-container *ngIf=\"!reports || reports.length == 0\">\r\n    <div *ngFor=\"let i of [0, 1, 2]\" padding>\r\n      <ion-skeleton-text></ion-skeleton-text>\r\n      <p>\r\n        <ion-skeleton-text class=\"fake-skeleton\"></ion-skeleton-text>\r\n      </p>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <ion-card *ngFor=\"let report of reports\">\r\n    <img [src]=\"report.image\" />\r\n    <ion-card-header>\r\n      <ion-card-title>{{report.title}}</ion-card-title>\r\n    </ion-card-header>\r\n    <ion-card-content>\r\n      {{report.description}}\r\n    </ion-card-content>\r\n\r\n    <ion-chip *ngFor=\"let label of report.labels\" color=\"{{label.color}}\">\r\n      <ion-icon name=\"{{label.icon}}\" color=\"{{label.color}}\"></ion-icon>\r\n      <ion-label>{{label.label}}</ion-label>\r\n    </ion-chip>\r\n\r\n    <ion-item>\r\n      <ion-chip *ngIf=\"report.priority <= 2\" color=\"success\">\r\n        <ion-icon name=\"bonfire\" color=\"success\"></ion-icon>\r\n        <ion-label>{{report.priority}}</ion-label>\r\n      </ion-chip>\r\n      <ion-chip *ngIf=\"report.priority == 3\" color=\"warning\">\r\n        <ion-icon name=\"bonfire\" color=\"warning\"></ion-icon>\r\n        <ion-label>{{report.priority}}</ion-label>\r\n      </ion-chip>\r\n      <ion-chip *ngIf=\"report.priority >= 4\" color=\"danger\">\r\n        <ion-icon name=\"bonfire\" color=\"danger\"></ion-icon>\r\n        <ion-label>{{report.priority}}</ion-label>\r\n      </ion-chip>\r\n    </ion-item>\r\n  </ion-card>\r\n\r\n  <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\r\n    <ion-fab-button routerLink=\"/add-report\" routerDirection=\"forward\">\r\n      <ion-icon name=\"add\"></ion-icon>\r\n    </ion-fab-button>\r\n  </ion-fab>\r\n</ion-content>"

/***/ }),

/***/ "./src/app/pages/tab2/tab2.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/tab2/tab2.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fake-skeleton {\n  width: 60%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvdGFiMi9DOlxcVXNlcnNcXGpvc2hfXFxEZXNrdG9wXFxPcHJhdnlBcHAvc3JjXFxhcHBcXHBhZ2VzXFx0YWIyXFx0YWIyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3RhYjIvdGFiMi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmFrZS1za2VsZXRvbiB7XHJcbiAgd2lkdGg6IDYwJTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/pages/tab2/tab2.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/tab2/tab2.page.ts ***!
  \*****************************************/
/*! exports provided: Tab2Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2Page", function() { return Tab2Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/data.service */ "./src/app/services/data.service.ts");



var Tab2Page = /** @class */ (function () {
    function Tab2Page(_dataService) {
        this._dataService = _dataService;
    }
    Tab2Page.prototype.ngOnInit = function () {
        var _this = this;
        this._dataService.getReports().subscribe(function (res) {
            _this.reports = res;
            console.log(_this.reports);
        });
    };
    Tab2Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tab2',
            template: __webpack_require__(/*! ./tab2.page.html */ "./src/app/pages/tab2/tab2.page.html"),
            providers: [src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]],
            styles: [__webpack_require__(/*! ./tab2.page.scss */ "./src/app/pages/tab2/tab2.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_services_data_service__WEBPACK_IMPORTED_MODULE_2__["DataService"]])
    ], Tab2Page);
    return Tab2Page;
}());



/***/ })

}]);
//# sourceMappingURL=tab2-tab2-module.js.map