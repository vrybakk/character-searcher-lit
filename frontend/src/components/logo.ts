import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { resetToHome } from '../services/app-state';
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
        transition: opacity 0.2s ease;
      }

      .logo:hover {
        opacity: 0.8;
      }

      .logo:focus {
        outline: 2px solid var(--color-vx-warm-neutral-700);
        outline-offset: 2px;
        border-radius: 4px;
      }

      .logo:active {
        opacity: 0.7;
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
    resetToHome();
  }

  render() {
    return html`
      <div
        @click=${this.handleClick}
        class="logo"
        tabindex="0"
        role="button"
        aria-label="Go to homepage"
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleClick();
          }
        }}
      >
        <img src="/img/logo-icon.svg" alt="StarFolk Logo" class="logo__icon" />
        <span class="logo__text">Star<span class="logo__text-part--bold">Folk</span></span>
      </div>
    `;
  }
}
