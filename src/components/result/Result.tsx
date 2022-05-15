import { useState } from 'react';
import bs58 from 'bs58';
import { useKeys } from '../../providers/KeyProvider';
import EyeSwitch from '../../svgs/EyeSwitch';
import Save from '../buttons/Save';
import styles from './Result.module.css';

const Download = () => {
  const [revealed, setRevealed] = useState(false);

  const { state: { keypair } } = useKeys();

  return (
    <div className={styles.container}>
      <div className={styles.keypair}>
        <p className={styles.row}>
          <span className={styles.label}>Address: </span>
          {
            keypair?.publicKey
            ? <span className={styles.key}>{keypair?.publicKey}</span>
            : 'Waiting for generate'
          }
        </p>
        <p className={styles.row}>
          <span className={styles.label}>Secret key: </span>
          {
            keypair?.publicKey
            ? <span className={styles.key}>
                {revealed ? bs58.encode(keypair?.secretKey) : 'Click to reveal'}
                <EyeSwitch revealed={revealed} onClick={() => setRevealed(!revealed)} />
              </span>
            : '--'
          }
        </p>
      </div>
      <Save className={styles.save} onClick={() => {}} />
    </div>
  ) 
}

export default Download;
