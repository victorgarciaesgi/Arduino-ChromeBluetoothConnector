import * as I from './Interfaces';

var MainApp: ng.IModule = angular.module('mainApp',  ['ngRoute','ngTouch','ngAnimate'])

function Runner($rootScope: any, $timeout: ng.ITimeoutService){
  console.log('salut');
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
}


MainApp.run(Runner);
