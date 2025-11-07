import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base-element';

@customElement('app-sidebar-wrapper')
export class AppSidebarWrapper extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
      }

      .sidebar {
        position: sticky;
        top: 40px;
        width: 100%;
        max-width: 300px;
        min-height: 330px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        box-sizing: border-box;
        background: var(--color-bw-white);
        border: 1px solid var(--color-vx-warm-neutral-200);
        box-shadow: var(--shadow-elevation-deep-1);
        border-radius: 16px;
      }

      ::slotted(*) {
        width: 100%;
      }
    `,
  ];

  render() {
    return html`
      <div class="sidebar">
        <slot></slot>
      </div>
    `;
  }
}
