'use strict'

var MainApp = angular.module('mainApp',['ngAnimate','ngTouch','ngRoute','angularMoment'])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeController',
    resolve: {}
  })

});



MainApp.run(function($rootScope, amMoment, $timeout) {
    amMoment.changeLocale('fr');

    $rootScope.User = {
      connected: false,
      playing: false
    }

    $rootScope.PartiePlaying = {};

    $rootScope.Alerts = {
      count: 0,
      list: [],
      delete(alert){
        var index = this.list.findIndex(element => element.id == alert.id);
        this.list.splice(index, 1);
      },
      add(type, message){
        var alert = {
          id: this.count,
          type: type,
          message: message,
        }
        this.count++;
        this.list.push(alert);
        $timeout(() => {
          this.delete(alert);
        },3000)
      }
    }
});
