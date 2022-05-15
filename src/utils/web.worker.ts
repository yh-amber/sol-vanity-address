
import bs58 from 'bs58';
import nacl from 'tweetnacl';
import { Ed25519Keypair } from '../types/interfaces';

function encodeKeypair(key: Uint8Array): string {
  return bs58.encode(key);
}

function loopGeneration(input: string): Ed25519Keypair {
  let keypair = nacl.sign.keyPair();
  let pubkey = encodeKeypair(keypair.publicKey);

  let count = 0;

  while (!pubkey.startsWith(input)) {
    keypair = nacl.sign.keyPair();
    pubkey = encodeKeypair(keypair.publicKey);

    console.log(`--------${count}--------`, keypair, pubkey);
  }

  console.log('=====================>', keypair, pubkey);

  return {
    publicKey: pubkey,
    secretKey: keypair.secretKey
  };
}

self.addEventListener('message', (event: MessageEvent): void => {
  console.log('Start generating...', event.data, self);

  const result = loopGeneration(event.data?.msg || '');

  postMessage(result);
});

declare const self: Worker;
export default {} as typeof Worker & { new (): Worker };
