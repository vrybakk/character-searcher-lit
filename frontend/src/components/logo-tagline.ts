import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base-element';
import './logo';

@customElement('logo-tagline')
export class LogoTagline extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 16px;
        font-family: var(--font-family-primary);
      }

      .logo-tagline__section {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left: 16px;
        gap: 8px;
        border-left: 1px solid var(--color-vx-warm-neutral-400);
        min-height: 38px;
      }

      .logo-tagline__text {
        font-size: var(--font-size-base);
        line-height: var(--line-height-19);
        font-weight: var(--font-weight-normal);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-700);
        text-align: left;
      }
    `,
  ];

  render() {
    return html`
      <app-logo></app-logo>
      <div class="logo-tagline__section">
        <span class="logo-tagline__text">All the characters.<br />One galaxy</span>
      </div>
    `;
  }
}
