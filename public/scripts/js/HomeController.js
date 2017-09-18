"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HomeController {
    constructor($scope, $rootScope) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.serviceUuid = 0xffe0;
        this.charUuid = 0xffe1;
        this.deviceFound = false;
        this.searching = false;
        this.Controls = {
            LED: { pin: 13, value: false }
        };
    }
    searchDevices() {
        this.searching = true;
        navigator.bluetooth.requestDevice({ filters: [{ namePrefix: 'SH', }], optionalServices: [this.serviceUuid] })
            .then(device => { return device.gatt.connect(); })
            .then(server => { return server.getPrimaryService(this.serviceUuid); })
            .then(service => { return service.getCharacteristic(this.charUuid); })
            .then(char => {
            this.Arduino = char;
            this.deviceFound = true;
            this.searching = false;
            this.$rootScope.Alerts.add("success", `Vous êtes connecté à l'appareil: ${char.service.device.name}`);
            this.$scope.$apply();
            return char.readValue();
        })
            .then((value) => {
            this.Controls.LED.value = (value.getUint8(0) == 1 ? true : false);
            this.$scope.$apply();
        });
    }
    sendToDevice(value) {
        this.Arduino.writeValue(value);
    }
    toggleLight() {
        let cmd = new Uint8Array(1);
        cmd[0] = this.Controls.LED.value ? 1 : 0;
        console.log(cmd);
        this.sendToDevice(cmd);
    }
}
HomeController.$inject = ['$scope', '$rootScope'];
MainApp.controller('HomeController', HomeController);
//# sourceMappingURL=HomeController.js.map