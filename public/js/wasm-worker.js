// const bs58 = require('bs58');
// importScripts('fs');
importScripts('../lib/wasm_vanity_address.js');

const { SolKeypair, memory } = wasm_bindgen;

async function init_wasm_in_worker(expect) {
  // Load the wasm file by awaiting the Promise returned by `wasm_bindgen`.
  const wasm = await wasm_bindgen('../lib/wasm_vanity_address_bg.wasm');

  const keypair = SolKeypair.generate(expect);

  console.log('+++++++', keypair);

  if (keypair instanceof SolKeypair && keypair.hasOwnProperty('ptr')) {
    const pubkeyPointer = keypair.public_key();
    const secretkeyPointer = keypair.secret_key();

    const pubkey = new Uint8Array(wasm.memory.buffer, pubkeyPointer, 32);
    const secretKey = new Uint8Array(wasm.memory.buffer, secretkeyPointer, 64);

    return {
      pubkey,
      secretKey,
    };
  }
};

self.addEventListener('message', async function (evt) {
  console.log('want: ', evt.data);
  const keypair = await init_wasm_in_worker(evt.data.msg);

  if (keypair) {
    console.log('0000000', keypair);
    self.postMessage({
      publicKey: Array.from(keypair.pubkey),
      secretKey: Array.from(keypair.secretKey),
    });
  }
});

console.log('Worker is ready...');