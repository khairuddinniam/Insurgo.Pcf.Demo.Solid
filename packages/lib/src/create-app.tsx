import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { render } from 'solid-js/web';
import AppComponent from './AppComponent';
import { AppProvider } from './AppProvider';
import { AppSetup, App, AppContext, AppResult } from './definition';
import { IInputs, IOutputs } from './generated/ManifestTypes';

export function createApp(setup: AppSetup<IInputs>): App<IInputs, IOutputs> {
  const appContext = createAppContext(setup);
  const updateView = (context: ComponentFramework.Context<IInputs>) => appContext.setContext(context);
  const getOutputs = () => appContext.result().outputs;
  const destroy = render(() => (
    <AppProvider value={appContext}>
      <AppComponent />
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

  return {
    context,
    setContext,
    setResult,
    result: () => result,
    notifyOutputChanged: setup.notifyOutputChanged,
    state: () => setup.state,
  };
}