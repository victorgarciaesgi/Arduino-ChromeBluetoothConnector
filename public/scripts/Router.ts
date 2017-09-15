
export class RouterConfig {

  static $inject = ['$routeProvider', '$locationProvider'];
  
  constructor($routeProvider: ng.route.IRouteProvider,$locationProvider: ng.ILocationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
      templateUrl: '/views/home.html',
      controller: 'HomeController as $',
    })
    .otherwise({
      redirectTo: '/'
    })
  }
}

MainApp.config(RouterConfig);