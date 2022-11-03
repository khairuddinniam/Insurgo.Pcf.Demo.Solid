import { Accessor, createEffect, createSignal, on, Setter, Signal } from 'solid-js';
import { render } from 'solid-js/web';
import AppEntry from './App';
import { AppProvider } from './AppProvider';
import { AppSetup, App, AppContext, ObjectAccessor, RawInputs } from './definition';
import { IInputs, IOutputs } from './generated/ManifestTypes';

export function createApp(setup: AppSetup<IInputs>): App<IInputs, IOutputs> {
  const appContext = createAppContext(setup);
  const updateView = (context: ComponentFramework.Context<IInputs>) => appContext.setContext(context);
  const getOutputs = () => appContext.outputs();
  const destroy = render(() => (
    <AppProvider value={appContext}>
      <AppEntry />
    </AppProvider>
  ), setup.container);

  return {
    updateView,
    getOutputs,
    destroy,
  };
}

function createAppContext(setup: AppSetup<IInputs>): AppContext<IInputs, IOutputs> & { setContext: (context: ComponentFramework.Context<IInputs>) => void } {
  const [context, setContext] = createSignal(setup.context, { equals: false });
  const [outputs, setOutputs] = createOutputsSignal(setup.notifyOutputChanged);
  const rawInputs = createRawInputs(context);

  return {
    context,
    setContext,
    outputs,
    setOutputs,
    notifyOutputChanged: setup.notifyOutputChanged,
    state: () => setup.state,
    rawInputs,
  };
}

const createOutputsSignal = (notifyOutputChanged: () => void): Signal<IOutputs> => {
  const [outputs, setOutputs] = createSignal<IOutputs>({
    invoiceAmount: undefined
  });
  createEffect(on(outputs, () => {
    notifyOutputChanged();
  }, { defer: true }));

  return [outputs, setOutputs];
}

const createRawInputs = (context: Accessor<ComponentFramework.Context<IInputs>>) => {
  const setter = {} as { [key in keyof IInputs]: Setter<any> };
  const result = {} as ObjectAccessor<RawInputs<IInputs>>;
  const ctx = context();
  Object.keys(ctx.parameters).forEach((key: keyof IInputs) => {
    const prop = ctx.parameters[key];
    const [rawProp, setRawProp] = createSignal<any>(prop.raw);    
    setter[key] = setRawProp;
    result[key] = rawProp;
  });

  createEffect(on(context, (c) => {
    Object.keys(c.parameters).forEach((key: keyof IInputs) => {
      const prop = ctx.parameters[key];
      setter[key](prop.raw);
    });
  }));

  return result;
}
