import bs58 from 'bs58';
import { Ed25519Keypair } from '../types/interfaces';

class WorkerGenerator {
  private workers: Worker[];

  constructor() {
    this.workers = [new Worker('/js/wasm-worker.js'), new Worker('/js/wasm-worker.js')]
  }

  start(msg: string, cb: (keypair: Ed25519Keypair) => void) {
    const that = this;

    that.workers.forEach((wk) => {
      wk.postMessage({ msg });

      wk.onmessage = function(evt: MessageEvent) {
        console.log('111111', evt.data);

        if (Array.isArray(evt.data.publicKey) && Array.isArray(evt.data.secretKey)) {
          const pubkeyString = bs58.encode(evt.data.publicKey);

          if (pubkeyString.startsWith(msg)) {
            cb({
              publicKey: pubkeyString,
              secretKey: Uint8Array.from(evt.data.secretKey),
            });

            that.stop();
          }
        }
      }
    })
  }

  stop() {
    this.workers.forEach((worker) => {
      worker.terminate();
    });

    console.log('terminated!!!');
  }
}

export default WorkerGenerator;