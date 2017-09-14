// PersonComponent.ts
import {MainApp} from './AppController';

export class HomeController {
    // . . .
}

MainApp.controller('PersonComponent', HomeController);



// MainApp.controller('HomeController', function ($scope, $rootScope, $route, $routeParams, $location) {

// 	let serviceUuid = 0xffe0;
// 	let charUuid = 0xffe1;
// 	let characteristic:any;

// 	$scope.toggle = false;


// 	$scope.Discover = {
// 		selected: {},
// 		getAll() {
//       navigator.bluetooth.requestDevice({filters: [{namePrefix: 'SH',}],optionalServices: [serviceUuid]})
//       .then(function(device) {
// 				console.log(device)
//         return device.gatt.connect();
//       })
//       .then(function(server) {
// 				console.log(server)
//         return server.getPrimaryService(serviceUuid);
//       })
//       .then(function(service) {
// 				console.log(service);
//         return service.getCharacteristic(charUuid);
//       })
//       .then(function(char) {
// 				console.log(char);
//         characteristic = char;
//       });
//     }
// 	};
// 	function write(cmd) {
// 		characteristic.writeValue(cmd);
// 	}

// 	$scope.toggleLight = function() {
// 		var cmd = new Uint8Array(1);
// 		cmd[0] = $scope.toggle?1:0;
// 		write(cmd);
// 	}






// });
