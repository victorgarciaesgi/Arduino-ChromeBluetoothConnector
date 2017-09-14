"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var angular_1 = require("angular");
exports.MainApp = angular_1.default('mainApp', [
    require('angular-ui-router'),
    require('angular-animate'),
    require('angular-ui-bootstrap'),
    require('angular-translate')
]);
// var MainApp: angular.IModule = angular.module('mainApp',['ngAnimate','ngTouch','ngRoute','angularMoment'])
// .config(function($routeProvider: any, $locationProvider: any) {
//   $routeProvider
//    .when('/', {
//     templateUrl: '/views/home.html',
//     controller: 'HomeController',
//     resolve: {}
//   })
// });
exports.MainApp.run(function ($rootScope, amMoment, $timeout) {
    amMoment.changeLocale('fr');
    $rootScope.User = {
        connected: false,
        playing: true,
    };
    $rootScope.PartiePlaying = {};
    $rootScope.Alerts = {
        count: 0,
        list: [],
        delete: function (alert) {
            var index = this.list.findIndex(function (element) { return element.id == alert.id; });
            this.list.splice(index, 1);
        },
        add: function (type, message) {
            var _this = this;
            var alert = {
                id: this.count,
                type: type,
                message: message,
            };
            this.count++;
            this.list.push(alert);
            $timeout(function () {
                _this.delete(alert);
            }, 3000);
        }
    };
});
//# sourceMappingURL=AppController.js.map