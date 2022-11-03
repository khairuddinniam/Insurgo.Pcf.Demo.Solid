/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

export const renderApp = (element: HTMLElement) => {
  return render(() => <App />, element);
}