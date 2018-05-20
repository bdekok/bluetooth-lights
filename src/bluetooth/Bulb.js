const settings = {
  name: [{namePrefix: 'LED'}],
  service: 0xcc02,
  colorWriteCharacteristic: 0xee03,
  colorReadCharacteristic: 0xee01 // doesn't seem to work?
};

export class Bulb {
  constructor() {
    this._colorWriteCharacteristic = null;
    this._device = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      navigator.bluetooth.requestDevice({
        filters: settings.name,
        optionalServices: [settings.service]
      })
        .then(device => {
          this._device = device;
          this._device.addEventListener('gattserverdisconnected', () => this.reconnectDevice());
          return this.connectDevice();
        })
        .then(server => {
          this._colorWriteCharacteristic = this.getCharacteristic(server, settings.colorWriteCharacteristic);
          return resolve();
        })
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }

  connectDevice() {
    return this._device.gatt.connect();
  }

  reconnectDevice() {
    this._colorWriteCharacteristic = null;
    this.connectDevice().then(server => {
      this._colorWriteCharacteristic = this.getCharacteristic(server, settings.colorWriteCharacteristic);
    });
  }

  getCharacteristic(server, characteristic) {
    return server.getPrimaryService(settings.service)
      .then(service => service.getCharacteristic(characteristic));
  }

  changeColor(r, g, b) {
    if (!this._colorWriteCharacteristic || !this._device.gatt.connected) {return;}
    this._colorWriteCharacteristic = this._colorWriteCharacteristic.then(characteristic => {
      return characteristic.writeValue(new Uint8Array([0x01, g, 0x01, 0x00, 0x01, b, 0x01, r, 0x01, 0x00]))
        .then(() => characteristic);
    })
      .catch(error => {
        console.error('Argh! ' + error);
      });
  }
}
