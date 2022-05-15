
import React from 'react';
import { useKeys } from '../../providers/KeyProvider';
import styles from './Button.module.css';

const Stop = () => {
  const { stopGenerator } = useKeys();

  return (
    <button className={styles.button} onClick={stopGenerator}>Stop</button>
  );
}

export default Stop;
