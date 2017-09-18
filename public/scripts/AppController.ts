import * as I from './Interfaces';
var MainApp: ng.IModule;
MainApp = angular.module('mainApp',  ['ngRoute','ngTouch','ngAnimate'])


class Runner{

  static $inject = ['$rootScope','$timeout'];

  constructor($rootScope: I.rootAlert, $timeout: ng.ITimeoutService){

    $rootScope.Alerts = {
      count: 0,list: [],
      delete(alert){
        let index = this.list.findIndex((element: I.Alert) => element.id == alert.id);
        this.list.splice(index, 1);
      },
      add(type, message){
        let alert: I.Alert = {id: this.count,type: type,message: message}
        this.count++;
        this.list.push(alert);
        console.log(this.list);
        $timeout(() => {this.delete(alert);},3000)
      }
    }
  }

  
}

MainApp.run(Runner);
