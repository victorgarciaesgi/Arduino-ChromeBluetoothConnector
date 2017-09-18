import * as I from './Interfaces';


class HomeController{
  readonly serviceUuid: number = 0xffe0;
  readonly charUuid: number = 0xffe1;

  public Arduino: BluetoothRemoteGATTCharacteristic;
  public deviceFound: boolean = false;
  public searching: boolean = false;
  public Controls = {
    LED: {pin: 13,value: false}
  };
  
  static $inject = ['$scope','$rootScope'];

  constructor(public $scope: ng.IScope, public $rootScope: I.rootAlert){}

  searchDevices() {
    this.searching = true;
    navigator.bluetooth.requestDevice({ filters: [{ namePrefix: 'SH', }], optionalServices: [this.serviceUuid] })
      .then(device => {return device.gatt.connect()})
      .then(server => {return server.getPrimaryService(this.serviceUuid)})
      .then(service => {return service.getCharacteristic(this.charUuid)})
      .then(char => {
        this.Arduino = char;
        this.deviceFound = true;
        this.searching = false;
        this.$rootScope.Alerts.add("success", `Vous êtes connecté à l'appareil: ${char.service.device.name}`)
        this.$scope.$apply();
        return char.readValue();
      })
      .then((value) => {
        this.Controls.LED.value = (value.getUint8(0) == 1?true:false);
        this.$scope.$apply();
      });
  }

  sendToDevice(value: Uint8Array) {
    this.Arduino.writeValue(value);
  }

  toggleLight() {
    let cmd: Uint8Array = new Uint8Array(1);
    cmd[0] = this.Controls.LED.value?1:0;
    console.log(cmd);
    this.sendToDevice(cmd);
    
  }
}

MainApp.controller('HomeController', HomeController);
