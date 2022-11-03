import { Accessor, createEffect, createSignal, on, Setter } from 'solid-js';
import { createStore } from 'solid-js/store';
import { render } from 'solid-js/web';
import AppEntry from './App';
import { AppProvider } from './AppProvider';
import { AppSetup, App, AppContext, AppResult, ObjectAccessor, RawInputs } from './definition';
import { IInputs, IOutputs } from './generated/ManifestTypes';

export function createApp(setup: AppSetup<IInputs>): App<IInputs, IOutputs> {
  const appContext = createAppContext(setup);
  const updateView = (context: ComponentFramework.Context<IInputs>) => appContext.setContext(context);
  const getOutputs = () => appContext.result().outputs;
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
  const [result, setResult] = createStore<AppResult<IOutputs>>({
    outputs: {
      invoiceAmount: undefined
    }
  });
  const rawInputs = createRawInputs(context);

  return {
    context,
    setContext,
    setResult,
    result: () => result,
    notifyOutputChanged: setup.notifyOutputChanged,
    state: () => setup.state,
    rawInputs,
  };
}

function createRawInputs(context: Accessor<ComponentFramework.Context<IInputs>>) {
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
