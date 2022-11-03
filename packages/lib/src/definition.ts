import { Accessor, Setter } from 'solid-js';
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
  rawInputs: ObjectAccessor<RawInputs<Inputs>>;
}

export type ObjectAccessor<T> = {
  [key in keyof T]: Accessor<T[key]>;
}

export type ObjectSetter<T> = {
  [key in keyof T]: Setter<T[key]>;
}

export type RawInputs<Inputs> = {
  [key in keyof Inputs]: Inputs[key] extends ComponentFramework.PropertyTypes.StringProperty ? string 
                          : Inputs[key] extends ComponentFramework.PropertyTypes.NumberProperty ? number
                          : never;
}