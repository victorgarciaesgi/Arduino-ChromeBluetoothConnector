class HomeController {
    constructor($scope) {
        this.$scope = $scope;
        this.serviceUuid = 0xffe0;
        this.charUuid = 0xffe1;
        this.toggle = false;
        $scope = this;
    }
    searchDevices() {
        navigator.bluetooth.requestDevice({ filters: [{ namePrefix: 'SH', }], optionalServices: [this.serviceUuid] })
            .then(device => { console.log(device); return device.gatt.connect(); })
            .then(server => { console.log(server); return server.getPrimaryService(this.serviceUuid); })
            .then(service => { console.log(service); return service.getCharacteristic(this.charUuid); })
            .then(char => { console.log(char); this.Arduino = char; });
    }
    sendToDevice(value) {
        this.Arduino.writeValue(value);
    }
    toggleLight() {
        console.log('toggle');
        let cmd = new Uint8Array(1);
        cmd[0] = this.toggle ? 1 : 0;
        this.sendToDevice(cmd);
    }
}
HomeController.$inject = ['$scope', '$rootScope'];
MainApp.controller('HomeController', HomeController);
//# sourceMappingURL=HomeController.js.map