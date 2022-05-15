import { createContext, FC, ReactNode, useCallback, useContext, useReducer } from 'react';
import WorkerGenerator from '../utils/generator';
import { ActionType, GeneratorStatus } from '../types/enums';
import { Ed25519Keypair } from '../types/interfaces';
import { BASE58_ALPHABET } from '../constants/constants'

interface State {
  input: string,
  generator: WorkerGenerator,
  keypair: Ed25519Keypair,
  errors: string[],
  progress: GeneratorStatus,
}

interface IContext {
  state: State,
  updateInputs: (val: string) => void,
  updateErrors: (val: string) => void,
  startGenerator: () => void;
  stopGenerator: () => void,
}

const initialState = {
  input: '',
  errors: [],
  generator: new WorkerGenerator(),
  keypair: {
    publicKey: '',
    secretKey: Uint8Array.from([]),
  },
  progress: GeneratorStatus.INITIATED,
}

const Context = createContext<IContext>({
  state: initialState,
  updateInputs: () => {},
  updateErrors: () => {},
  startGenerator: () => {},
  stopGenerator: () => {},
})

export const useKeys = () => {
  const { state, updateInputs, updateErrors, startGenerator, stopGenerator } = useContext(Context);

  return {
    state,
    updateInputs,
    updateErrors,
    startGenerator,
    stopGenerator,
  }
}

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case ActionType.UPDATE_INPUTS: {
      return {
        ...state,
        input: action.value,
      }
    }
    case ActionType.SET_GENERATOR: {
      return {
        ...state,
        generator: action.value,
        progress: action.status,
      }
    }
    case ActionType.UPDATE_KEYPAIR: {
      return {
        ...state,
        keypair: action.keypair,
      }
    }
    case ActionType.UPDATE_PROGRESS: {
      return {
        ...state,
        progress: action.status,
      }
    }
    case ActionType.ERROR: {
      return {
        ...state,
        errors: action.errors
      }
    }
    default:
      throw new Error();
  }
}

const KeyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { input, generator } = state;

  const updateInputs = useCallback((value: string) => {
    if (!BASE58_ALPHABET.includes(value.charAt(value.length - 1))) return;

    dispatch({
      type: ActionType.UPDATE_INPUTS,
      value,
    })
  }, []);

  const updateErrors = useCallback((msg: string) => {
    const err = [];

    if (msg) {
      err.push(msg);
    }

    dispatch({
      type: ActionType.ERROR,
      errors: err,
    })
  }, [])

  const startGenerator = useCallback(() => {
    if (input) {
      dispatch({
        type: ActionType.UPDATE_PROGRESS,
        status: GeneratorStatus.IN_PROGRESS
      });

      const dispatchCallback = (keypair: Ed25519Keypair) => {
        dispatch({
          type: ActionType.UPDATE_KEYPAIR,
          keypair,
        });

        dispatch({
          type: ActionType.SET_GENERATOR,
          value: new WorkerGenerator(),
          status: GeneratorStatus.INITIATED,
        });        
      }

      generator.start(input, dispatchCallback);
    }
  }, [input, generator]);

  const stopGenerator = useCallback(() => {
    generator.stop();

    dispatch({
      type: ActionType.SET_GENERATOR,
      value: new WorkerGenerator(),
      status: GeneratorStatus.INITIATED,
    });
  }, [generator]);

  const context = {
    state,
    updateInputs,
    updateErrors,
    startGenerator,
    stopGenerator,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

export default KeyProvider;