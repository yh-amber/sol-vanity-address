
import React from 'react';
import { useKeys } from '../../providers/KeyProvider';
import styles from './Button.module.css';

const Stop = () => {
  const { stopGeneration } = useKeys();

  return (
    <button className={styles.button} onClick={stopGeneration}>Stop</button>
  );
}

export default Stop;
