import { BASE58_ALPHABET, ADDRESS_LENGTH } from '../constants/constants';

export function getAddressExample(input: string): string {
  let random = input;

  for (let i = 0; i < ADDRESS_LENGTH - input.length; i++) {
    random += BASE58_ALPHABET[Math.floor((Math.random() * 58))];
  }

  return random;
}
