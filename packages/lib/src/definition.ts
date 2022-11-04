import { Accessor, Setter } from 'solid-js';

export type AppSetup<Inputs> = {
  context: ComponentFramework.Context<Inputs>;
  notifyOutputChanged: () => void;
  state: ComponentFramework.Dictionary;
}

export type App<Inputs, Outputs extends {}> = {
  updateView(context: ComponentFramework.Context<Inputs>): void;
  getOutputs(): Outputs;
  destroy(): void;
  render(container: HTMLElement): void;
  readonly pcf: PcfContext<Inputs, Outputs>;
}

export type PcfContext<Inputs, Outputs extends {}> = {
  notifyOutputChanged(): void;
  readonly state: Accessor<ComponentFramework.Dictionary>; 
  readonly context: Accessor<ComponentFramework.Context<Inputs>>;
  readonly outputs: Accessor<Outputs>;
  readonly setOutputs: Setter<Outputs>;
  readonly rawInputs: ObjectAccessor<RawInputs<Inputs>>;
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