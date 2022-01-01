import React, { ChangeEvent, useCallback } from 'react';
import { useKeys } from './providers/KeyProvider';
import Input from './components/input/Input';
import Generate from './components/buttons/Generate';
import Stop from './components/buttons/Stop';
import FormError from './components/errors/FormError';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h2>Solana Vanity Address</h2>
      <FormError />
      <Input />

      <div className={styles.buttons}>
        <Generate />
        <Stop />
      </div>
    </div>
  );
}

export default App;
