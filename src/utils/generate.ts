import WebWorker from '../web.worker';
import { GenerationStatus } from '../types/enums';
import { Ed25519Keypair } from '../types/interfaces';

class GenerationWorker {
  worker: Worker | null = null;
  data: Ed25519Keypair | null = null;
  status: GenerationStatus = GenerationStatus.INITIATED;

  constructor() {
    this.worker = new WebWorker();
  }

  start(msg: string) {
    const self = this;
    self.status = GenerationStatus.IN_PROGRESS;

    self.worker!.postMessage({ msg });

    self.worker!.onmessage = function(evt: MessageEvent) {
      self.data = evt.data;
      self.status = GenerationStatus.COMPLETED;
    }
  }

  stop() {
    console.log('terminating................');

    this.worker!.terminate();

    console.log('terminated................');
  }
}

export default GenerationWorker;