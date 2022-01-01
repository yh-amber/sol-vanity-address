import React, { ChangeEvent, useCallback } from 'react';
import { useKeys } from '../../providers/KeyProvider';
import styles from './Input.module.css';

const Input = () => {
  const { state: { input, example }, updateInputs, updateErrors } = useKeys();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateErrors('');
    updateInputs(e.target.value);
  }, []);

  return (
    <div className={styles.wrapper}>
      <input className={styles.input} type="text" value={input} onChange={handleChange} />
      <span className={styles.example}>E.g.&nbsp;{example}</span>
    </div>
  );
}

export default Input;
