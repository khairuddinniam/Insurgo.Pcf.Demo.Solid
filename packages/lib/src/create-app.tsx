import { Accessor, createEffect, createSignal, on, Signal } from 'solid-js';
import { render } from 'solid-js/web';
import AppEntry from './App';
import { PcfProvider } from './PcfProvider';
import { AppSetup, App, PcfContext, ObjectAccessor, RawInputs } from './definition';
import { IInputs, IOutputs } from './generated/ManifestTypes';

export function createApp(setup: AppSetup<IInputs>): App<IInputs, IOutputs> {
  const pcf = createPcfContext(setup);
  const updateView = (context: ComponentFramework.Context<IInputs>) => pcf.setContext(context);
  const getOutputs = () => pcf.outputs();
  let unmount: () => void;
  const destroy = () => unmount?.();
  const doRender = (container: HTMLElement) => {
    unmount = render(() => (
      <PcfProvider value={pcf}>
        <AppEntry />
      </PcfProvider>
    ), container);
  };

  return {
    updateView,
    getOutputs,
    destroy,
    render: doRender,
    pcf,
  };
}

function createPcfContext(setup: AppSetup<IInputs>): PcfContext<IInputs, IOutputs> & { setContext: (context: ComponentFramework.Context<IInputs>) => void } {
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
  createEffect(on(outputs, () => notifyOutputChanged(), { defer: true }));
  return [outputs, setOutputs];
}

const createRawInputs = (context: Accessor<ComponentFramework.Context<IInputs>>) => {
  const result = {} as ObjectAccessor<RawInputs<IInputs>>;
  Object.keys(context().parameters).forEach((key: keyof IInputs) => {
    result[key] = (): any => context().parameters[key].raw;
  });

  return result;
}
