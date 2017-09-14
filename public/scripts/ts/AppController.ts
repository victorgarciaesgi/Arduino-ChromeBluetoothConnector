import * as I from './Interfaces';
import module from 'angular';


export let MainApp: ng.IModule = module('mainApp',  [
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

MainApp.run(function($rootScope: any, amMoment: any, $timeout:any) {

    amMoment.changeLocale('fr');

    $rootScope.User = {
      connected: false,
      playing: true,
    }

    $rootScope.PartiePlaying = {};

    $rootScope.Alerts = {
      count: 0,
      list: [],
      delete(alert: I.Alert){
        var index = this.list.findIndex((element: I.Alert) => element.id == alert.id);
        this.list.splice(index, 1);
      },
      add(type: string, message: string){
        var alert: I.Alert = {
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
