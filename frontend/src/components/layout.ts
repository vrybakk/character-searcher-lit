import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './sidebar';

@customElement('app-layout')
export class AppLayout extends LitElement {
  static styles = css`
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

    .layout__content {
      flex: 1;
      min-width: 0;
    }

    .layout__sidebar-right {
      flex-shrink: 0;
      box-sizing: border-box;
      min-width: 293px;
    }
  `;

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
        <aside class="layout__sidebar-right">
          <slot name="sidebar-right"></slot>
        </aside>
      </div>
    `;
  }
}
