
import { useMemo } from 'react';
import { useKeys } from '../../providers/KeyProvider';
import { GeneratorStatus } from '../../types/enums';
import styles from './Button.module.css';

const Generate = () => {
  const { startGenerator, state: { progress } } = useKeys();

  const inProgress = useMemo(() => progress === GeneratorStatus.IN_PROGRESS, [progress]);

  return (
    <button className={styles.button} onClick={startGenerator} disabled={inProgress}>
      {inProgress ? 'Generating...' : 'Generate'}
    </button>
  );
}

export default Generate;
