import { ChangeEvent, useCallback } from 'react';
import { INPUT_TIP } from '../../constants/constants';
import { useKeys } from '../../providers/KeyProvider';
import { GeneratorStatus } from '../../types/enums';
import { getAddressExample } from '../../utils/address';
import styles from './Input.module.css';

const Input = () => {
  const { state: { input, progress }, updateInputs } = useKeys();

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    updateInputs(e.target.value);
  }, [updateInputs]);

  return (
    <div className={styles.wrapper}>
      <p className={styles.tip}><span className={styles.star}>*</span>{INPUT_TIP}</p>
      <input
        className={styles.input}
        type="text"
        value={input}
        onChange={handleChange}
        disabled={progress === GeneratorStatus.IN_PROGRESS}
      />
      <span className={styles.example}>E.g.&nbsp;{getAddressExample(input)}</span>
    </div>
  );
}

export default Input;
