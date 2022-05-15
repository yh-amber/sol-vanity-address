import { useState } from 'react';
import bs58 from 'bs58';
import { useKeys } from '../../providers/KeyProvider';
import EyeSwitch from '../../svgs/EyeSwitch';
import styles from './Result.module.css';
import Save from '../buttons/Save';

const Download = () => {
  const [revealed, setRevealed] = useState(false);
  const { state: { keypair: { publicKey, secretKey } } } = useKeys();

  // const blobUrl = useMemo(() => {
  //   return URL.createObjectURL(new Blob([JSON.stringify(Array.from(secretKey))], { type : 'application/json' }));
  // }, [secretKey])

  return (
    <div className={styles.container}>
      <div className={styles.keypair}>
        <p className={styles.row}>
          <span className={styles.label}>Address: </span>
          {
            publicKey
            ? <span className={styles.key}>{publicKey}</span>
            : 'Waiting for generating'
          }
        </p>
        <p className={styles.row}>
          <span className={styles.label}>Secret key: </span>
          {
            publicKey
            ? <span className={styles.key}>
                {revealed ? bs58.encode(secretKey) : 'Click to reveal'}
                <EyeSwitch revealed={revealed} onClick={() => setRevealed(!revealed)} />
              </span>
            : 'Waiting for generating'
          }
        </p>
      </div>
      <Save className={styles.save} />
      {/* {
        publicKey &&
        <a href={blobUrl} download="solana-vanity-id.json" className={styles.save} rel="noopener noreferrer">
          <DownloadIcon /> &nbsp; Save
        </a>
      } */}
    </div>
  ) 
}

export default Download;
