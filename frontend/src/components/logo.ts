import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-logo')
export class AppLogo extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    .logo__icon {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
    }

    .logo__text {
      font-size: clamp(28px, 4vw, 42px);
      line-height: 38px;
      font-weight: 400;
      letter-spacing: -0.03em;
      color: var(--color-vx-warm-neutral-700);
      white-space: nowrap;
    }

    .logo__text-part--bold {
      font-weight: 600;
    }
  `;

  render() {
    return html`
      <img src="/img/logo-icon.svg" alt="StarFolk Logo" class="logo__icon" />
      <span class="logo__text">Star<span class="logo__text-part--bold">Folk</span></span>
    `;
  }
}
