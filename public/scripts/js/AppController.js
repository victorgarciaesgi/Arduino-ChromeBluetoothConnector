"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainApp = angular.module('mainApp', ['ngRoute', 'ngTouch', 'ngAnimate']);
function Runner($rootScope, $timeout) {
    console.log('salut');
    $rootScope.Alerts = {
        count: 0,
        list: [],
        delete(alert) {
            var index = this.list.findIndex((element) => element.id == alert.id);
            this.list.splice(index, 1);
        },
        add(type, message) {
            var alert = {
                id: this.count,
                type: type,
                message: message,
            };
            this.count++;
            this.list.push(alert);
            $timeout(() => {
                this.delete(alert);
            }, 3000);
        }
    };
}
MainApp.run(Runner);
//# sourceMappingURL=AppController.js.map