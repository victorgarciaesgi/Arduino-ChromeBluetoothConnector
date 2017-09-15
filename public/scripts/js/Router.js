"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterConfig {
    constructor($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
            templateUrl: '/views/home.html',
            controller: 'HomeController as $',
        })
            .otherwise({
            redirectTo: '/'
        });
    }
}
RouterConfig.$inject = ['$routeProvider', '$locationProvider'];
exports.RouterConfig = RouterConfig;
MainApp.config(RouterConfig);
//# sourceMappingURL=Router.js.map