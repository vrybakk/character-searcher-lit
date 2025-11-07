import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './logo';

@customElement('logo-tagline')
export class LogoTagline extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
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
      font-size: 16px;
      line-height: 19px;
      font-weight: 400;
      letter-spacing: -0.03em;
      color: var(--color-vx-warm-neutral-700);
      text-align: left;
    }
  `;

  render() {
    return html`
      <app-logo></app-logo>
      <div class="logo-tagline__section">
        <span class="logo-tagline__text">All the characters.<br />One galaxy</span>
      </div>
    `;
  }
}
