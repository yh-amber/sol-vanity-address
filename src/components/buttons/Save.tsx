import { FC } from 'react';
import DownloadIcon from '../../svgs/Download';
import styles from './Button.module.css';

const Save: FC<{
  onClick: () => void,
  className?: string,
}> = ({ onClick, className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <DownloadIcon /> &nbsp; Save
    </button>
  );
}

export default Save;
