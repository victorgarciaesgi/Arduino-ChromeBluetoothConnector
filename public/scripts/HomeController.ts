
class HomeController{
  public serviceUuid: number = 0xffe0;
  public charUuid: number = 0xffe1;
  public Arduino: any;
  public toggle: boolean = false;
  public $rootScope: angular.IRootScopeService;
  
  static $inject = ['$scope','$rootScope'];

  constructor(public $scope){
    $scope = this;
  }

  searchDevices() {
    navigator.bluetooth.requestDevice({ filters: [{ namePrefix: 'SH', }], optionalServices: [this.serviceUuid] })
      .then(device => {console.log(device); return device.gatt.connect()})
      .then(server => {console.log(server); return server.getPrimaryService(this.serviceUuid)})
      .then(service => {console.log(service); return service.getCharacteristic(this.charUuid)})
      .then(char => {console.log(char); this.Arduino = char});
  }

  sendToDevice(value: Uint8Array) {
    this.Arduino.writeValue(value);
  }

  toggleLight() {
    console.log('toggle');
    let cmd: Uint8Array = new Uint8Array(1);
    cmd[0] = this.toggle ? 1 : 0;
    this.sendToDevice(cmd);
  }
}

MainApp.controller('HomeController', HomeController);
