import './components/character-detail';
import './components/character-list';
import './components/header';
import './components/homepage';
import './components/layout';
import './components/loading-spinner';
import './components/logo-tagline';
import './components/search';
import './design-tokens/tokens.css';
import { EVENTS, getState, updateStateFromRoute } from './services/app-state';
import { router } from './services/router';
import './styles/style.css';
import './types/events';

const app = document.querySelector<HTMLDivElement>('#app')!;

Promise.all([
  customElements.whenDefined('app-layout'),
  customElements.whenDefined('app-header'),
  customElements.whenDefined('app-sidebar'),
]).then(() => {
  app.innerHTML = `
    <app-layout>
      <div id="content-slot"></div>
    </app-layout>
  `;

  const contentSlot = document.querySelector<HTMLDivElement>('#content-slot')!;

  let currentElement: HTMLElement | null = null;
  let currentView: string | null = null;

  function renderView(): void {
    const state = getState();

    if (currentView === state.view && currentElement && currentElement.parentNode) {
      return;
    }

    currentView = state.view;

    if (currentElement && currentElement.parentNode) {
      currentElement.remove();
      currentElement = null;
    }

    if (state.view === 'character-detail') {
      currentElement = document.createElement('app-character-detail');
    } else if (state.view === 'search') {
      currentElement = document.createElement('app-character-list');
    } else {
      currentElement = document.createElement('app-homepage');
    }

    contentSlot.appendChild(currentElement);
  }

  router.onRouteChange((route) => {
    updateStateFromRoute(route.path, route.query, route.params);
  });

  window.addEventListener(EVENTS.STATE_UPDATED, () => {
    renderView();
  });

  router.init();
  renderView();
});
