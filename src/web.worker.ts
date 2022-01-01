
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { Ed25519Keypair } from './types/interfaces';
import { GenerationStatus } from './types/enums';

function encodeKeypair(keypair: Ed25519Keypair): string {
  return bs58.encode(keypair.publicKey);
}

function loopGeneration(input: string): Ed25519Keypair {
  let keys = nacl.sign.keyPair();
  let encodeKey = encodeKeypair(keys);

  // let count = 0;

  // let begin;
  // let end;

  while (!encodeKey.startsWith(input)) {
    // if (count === 0) {
    //   begin = new Date();
    // }

    // if (count === 100) {
    //   end = new Date();
    // }

    // count++;
    keys = nacl.sign.keyPair();
    encodeKey = encodeKeypair(keys);

    console.log('--------------------------', keys, encodeKey);
  }

  // console.log('<<<<<<<<<<<<<<<<', '\n', begin?.getTime(), '\n', end?.getTime(), '\n', count);

  console.log('=====================>', keys, encodeKey, GenerationStatus);
  return keys;
}

self.addEventListener('message', (event: MessageEvent): void => {
  console.log('Start generating...', event.data, self);

  const result = loopGeneration(event.data?.msg || '');

  postMessage(result);
});

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };
