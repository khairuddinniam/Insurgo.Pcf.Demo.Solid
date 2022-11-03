import { createContext, FlowComponent, useContext } from 'solid-js';
import { AppContext } from './definition';
import { IInputs, IOutputs } from './generated/ManifestTypes';

const _AppContext = createContext<AppContext<IInputs, IOutputs>>();

export const AppProvider: FlowComponent<{ value: AppContext<IInputs, IOutputs> }> = (props) => {
  return (
    <_AppContext.Provider value={props.value}>
      {props.children}
    </_AppContext.Provider>
  );
}

export const useAppContext = () => useContext(_AppContext);