import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { router } from '../services/router';
import { BaseElement } from './base-element';

@customElement('app-logo')
export class AppLogo extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      .logo {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .logo__icon {
        width: 50px;
        height: 50px;
        flex-shrink: 0;
      }

      .logo__text {
        font-size: var(--font-size-2xl);
        line-height: var(--line-height-38);
        font-weight: var(--font-weight-normal);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-700);
        white-space: nowrap;
      }

      .logo__text-part--bold {
        font-weight: var(--font-weight-semibold);
      }
    `,
  ];

  private handleClick(): void {
    router.goHome();
  }

  render() {
    return html`
      <div @click=${this.handleClick} class="logo">
        <img src="/img/logo-icon.svg" alt="StarFolk Logo" class="logo__icon" />
        <span class="logo__text">Star<span class="logo__text-part--bold">Folk</span></span>
      </div>
    `;
  }
}
