import Input from './components/input/Input';
import Generate from './components/buttons/Generate';
import Stop from './components/buttons/Stop';
import FormError from './components/errors/FormError';
import Download from './components/result/Result';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1>Solana Vanity Address</h1>
      <div className={styles.inputBox}>
        <FormError />
        <Input />
      </div>

      <div className={styles.buttons}>
        <Generate />
        <Stop />
      </div>
      <Download />
    </div>
  );
}

export default App;
