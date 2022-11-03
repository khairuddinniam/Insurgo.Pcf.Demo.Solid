import { Setter, Accessor } from 'solid-js';
import { SetStoreFunction } from 'solid-js/store';

export type AppSetup<Inputs> = {
  context: ComponentFramework.Context<Inputs>;
  notifyOutputChanged: () => void;
  state: ComponentFramework.Dictionary; 
  container: HTMLDivElement;
}

export type App<Inputs, Outputs> = {
  updateView(context: ComponentFramework.Context<Inputs>): void;
  getOutputs(): Outputs;
  destroy(): void;
}

export type AppResult<Outputs> = {
  outputs: Outputs;
}

export type AppContext<Inputs, Outputs> = {
  notifyOutputChanged: () => void;
  state: Accessor<ComponentFramework.Dictionary>; 
  context: Accessor<ComponentFramework.Context<Inputs>>;
  result: Accessor<AppResult<Outputs>>;
  setResult: SetStoreFunction<AppResult<Outputs>>;
}