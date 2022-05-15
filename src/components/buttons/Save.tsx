import { FC, useCallback, useMemo } from 'react';
import download from 'downloadjs';
import { useKeys } from '../../providers/KeyProvider';
import DownloadIcon from '../../svgs/Download';
import styles from './Button.module.css';
import { GeneratorStatus } from '../../types/enums';

const Save: FC<{
  className?: string,
}> = ({ className }) => {
  const { state: { progress, keypair: { publicKey, secretKey } } } = useKeys();

  const handleClick = useCallback(() => {
    download(JSON.stringify(Array.from(secretKey)), 'solana-vanity-id.json', 'application/json')
  }, [secretKey]);

  const disabled = useMemo(() => {
    return progress === GeneratorStatus.IN_PROGRESS || !publicKey;
  }, [progress, publicKey]);

  return (
    <button className={`${styles.button} ${className}`} disabled={disabled} onClick={handleClick}>
      <DownloadIcon disabled={disabled} /> &nbsp; Save
    </button>
  );
}

export default Save;
