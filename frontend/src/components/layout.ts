import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { router } from '../services/router';
import { BaseElement } from './base-element';
import './character-summary';
import './sidebar';
import './sidebar-wrapper';

@customElement('app-layout')
export class AppLayout extends BaseElement {
  @state()
  private declare currentView: string;

  private unsubscribeRouter: (() => void) | null = null;

  constructor() {
    super();
    this.currentView = 'home';
  }

  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .layout {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 40px;
        margin: 40px auto 0;
        box-sizing: border-box;
      }

      .layout__sidebar {
        flex-shrink: 0;
      }

      .layout__sidebar--right {
        order: 2;
      }

      .layout__content {
        flex: 1;
        min-width: 0;
        order: 1;
      }

      @media (max-width: 1024px) {
        .layout {
          gap: 24px;
          flex-direction: column;
        }

        .layout__sidebar {
          width: 100%;
          max-width: 100%;
        }

        .layout__sidebar--right {
          order: 3;
        }

        .layout__content {
          order: 1;
        }
      }

      @media (max-width: 768px) {
        .layout {
          flex-direction: column;
          gap: 20px;
          margin: 20px auto 0;
        }

        .layout__sidebar:not(.layout__sidebar--right) {
          display: none;
        }

        .layout__sidebar {
          width: 100%;
          max-width: 100%;
        }

        .layout__sidebar--right {
          order: 3;
        }

        .layout__content {
          order: 1;
        }
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    const route = router.getCurrentRoute();
    this.currentView = route.path.startsWith('/character/')
      ? 'character-detail'
      : route.path === '/search'
      ? 'search'
      : 'home';

    this.unsubscribeRouter = router.onRouteChange((route) => {
      this.currentView = route.path.startsWith('/character/')
        ? 'character-detail'
        : route.path === '/search'
        ? 'search'
        : 'home';
      this.requestUpdate();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
    }
  }

  render() {
    return html`
      <app-header></app-header>
      <div class="layout">
        <aside class="layout__sidebar">
          <slot name="sidebar-left">
            <app-sidebar></app-sidebar>
          </slot>
        </aside>
        <main class="layout__content">
          <slot></slot>
        </main>
        ${this.currentView === 'character-detail'
          ? html`
              <aside class="layout__sidebar layout__sidebar--right">
                <app-sidebar-wrapper>
                  <app-character-summary></app-character-summary>
                </app-sidebar-wrapper>
              </aside>
            `
          : ''}
      </div>
    `;
  }
}
