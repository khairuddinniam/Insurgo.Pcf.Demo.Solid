/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';

export const renderApp = (element: HTMLElement) => {
  return render(() => <App />, element);
}