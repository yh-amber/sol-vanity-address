import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useReducer } from 'react';
import { getAddressExample } from '../utils/address';
import GenerationWorker from '../utils/generate';
import { changeWorkerStatus, getWorkerStatus } from '../utils/worker-status';
import { ActionType } from '../types/enums';
import { BASE58_ALPHABET, INPUT_ERROR_ALLOWED } from '../constants/constants'

interface State {
  input: string,
  example: string,
  generator: GenerationWorker,
  errors: string[],
}

interface IContext {
  state: State,
  updateInputs: (val: string) => void,
  updateErrors: (val: string) => void,
  generate: () => void;
  stopGeneration: () => void,
}

const initialState = {
  input: '',
  errors: [],
  example: getAddressExample(''),
  generator: new GenerationWorker(),
}

const Context = createContext<IContext>({
  state: initialState,
  updateInputs: () => {},
  updateErrors: () => {},
  generate: () => {},
  stopGeneration: () => {},
})

export const useKeys = () => {
  const { state, updateInputs, updateErrors, generate, stopGeneration } = useContext(Context);

  return {
    state,
    updateInputs,
    updateErrors,
    generate,
    stopGeneration,
  }
}

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case ActionType.UPDATE_INPUTS: {
      return {
        ...state,
        input: action.value,
        example: action.example,
      }
    };
    case ActionType.SET_GENERATOR: {
      return {
        ...state,
        generator: action.value
      }
    };
    case ActionType.ERROR: {
      return {
        ...state,
        errors: action.errors
      }
    };
    default:
      throw new Error();
  }
}

const KeyProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { input, generator } = state;

  const updateInputs = useCallback((value: string) => {
    if (!BASE58_ALPHABET.includes(value.charAt(value.length - 1))) {
      updateErrors(INPUT_ERROR_ALLOWED);

      return;
    }

    const example = getAddressExample(value);

    dispatch({
      type: ActionType.UPDATE_INPUTS,
      value,
      example,
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

  const generate = useCallback(() => {
    generator.start(input);
  }, [input, generator]);

  const stopGeneration = useCallback(() => {
    changeWorkerStatus(true);

    generator.stop();

    dispatch({
      type: ActionType.SET_GENERATOR,
      value: new GenerationWorker(),
    });
  }, [generator]);

  const context = {
    state,
    updateInputs,
    updateErrors,
    generate,
    stopGeneration,
  }

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  )
}

export default KeyProvider;