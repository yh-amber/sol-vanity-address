
import React from 'react';
import { useKeys } from '../../providers/KeyProvider';
import styles from './Error.module.css';

const FormError = () => {
  const { state: { errors } } = useKeys();

  return (
    <>
    {
      errors.map((msg: string) => {
        return (
          <span className={styles.error_msg} key={msg}>{msg}</span>
        )
      })
    }
    </>
  )
}

export default FormError;
