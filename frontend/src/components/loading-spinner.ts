import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base-element';

@customElement('app-loading-spinner')
export class AppLoadingSpinner extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
      }

      .spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 0;
      }

      .spinner__circle {
        width: 40px;
        height: 40px;
        border: 3px solid var(--color-vx-warm-neutral-200);
        border-top-color: var(--color-vx-warm-neutral-700);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .spinner--small .spinner__circle {
        width: 20px;
        height: 20px;
        border-width: 2px;
      }
    `,
  ];

  render() {
    return html`
      <div class="spinner">
        <div class="spinner__circle"></div>
      </div>
    `;
  }
}

