"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainApp;
MainApp = angular.module('mainApp', ['ngRoute', 'ngTouch', 'ngAnimate']);
class Runner {
    constructor($rootScope, $timeout) {
        $rootScope.Alerts = {
            count: 0, list: [],
            delete(alert) {
                let index = this.list.findIndex((element) => element.id == alert.id);
                this.list.splice(index, 1);
            },
            add(type, message) {
                let alert = { id: this.count, type: type, message: message };
                this.count++;
                this.list.push(alert);
                console.log(this.list);
                $timeout(() => { this.delete(alert); }, 3000);
            }
        };
    }
}
Runner.$inject = ['$rootScope', '$timeout'];
MainApp.run(Runner);
//# sourceMappingURL=AppController.js.map