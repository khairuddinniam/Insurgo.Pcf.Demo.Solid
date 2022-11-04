import { createContext, FlowComponent, useContext } from 'solid-js';
import { PcfContext } from './definition';
import { IInputs, IOutputs } from './generated/ManifestTypes';

const _PcfContext = createContext<PcfContext<IInputs, IOutputs>>();

export const PcfProvider: FlowComponent<{ value: PcfContext<IInputs, IOutputs> }> = (props) => {
  return (
    <_PcfContext.Provider value={props.value}>
      {props.children}
    </_PcfContext.Provider>
  );
}

export const usePcfContext = () => useContext(_PcfContext);