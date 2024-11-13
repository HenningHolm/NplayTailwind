
export class MidiAccess {
    devices;
    onDeviceInput;
    constructor(args: any) {
        this.devices = {};
        this.onDeviceInput = args.onDeviceInput || console.log();
    }

    start() {
        return new Promise((resolve, reject) => {
          this._requestAccess().then(access => {
            this.initialize(access);
            resolve("MIDI is ready");
          }).catch(() => reject('Something went wrong'));
        });
      }
    
      initialize(access) {
        const devices = access.inputs.values();
        for (let device of devices) this.initializeDevice(device);
      }
    
      initializeDevice(device) {
        device.onmidimessage = this.onMessage.bind(this);
      }
      
      onMessage(message) {
        if(message.data[0] != 254){
        let [status, midiNumber, velocity] = message.data;
        // console.log("midi message", message)
        this.onDeviceInput({status, midiNumber, velocity});
        }
      }
    
      _requestAccess() {
        return new Promise((resolve, reject) => {
          if (navigator.requestMIDIAccess)
            navigator.requestMIDIAccess()
              .then(resolve)
              .catch(reject);
          else reject();
        });
      }

    // hva er resolve vs inputen midiAccess
    _requestAccess2() {
        return new Promise<any>((resolve, reject) => {
            if (navigator.requestMIDIAccess) {
                navigator.requestMIDIAccess().then(
                    (midiAccess) => {
                        resolve(midiAccess);
                    },
                    (err) => {
                        reject(err);
                    }
                );
            } else {
                reject("MIDI not supported in your browser");
            }    
        });
    }

}

  