import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base-element';

@customElement('app-header')
export class AppHeader extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
      }

      .header {
        width: 100%;

        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 24px 40px;
        gap: 40px;

        background: var(--color-bw-white);
        border: 1px solid var(--color-vx-warm-neutral-200);
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.03);
        border-radius: 100px;
      }
    `,
  ];

  render() {
    return html`
      <header class="header">
        <logo-tagline></logo-tagline>
        <app-search></app-search>
      </header>
    `;
  }
}
