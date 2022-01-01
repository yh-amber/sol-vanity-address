
import React from 'react';
import { useKeys } from '../../providers/KeyProvider';
import styles from './Button.module.css';

const Generate = () => {
  const { generate } = useKeys();

  return (
    <button className={styles.button} onClick={generate}>Generate</button>
  );
}

export default Generate;
