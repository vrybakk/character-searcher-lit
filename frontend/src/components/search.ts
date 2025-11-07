import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base-element.js';

@customElement('app-search')
export class AppSearch extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        flex: 1;
      }

      .search {
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 0px 8px 16px;
        gap: 8px;
        width: 100%;
        height: 48px;
        background: var(--color-sl-color-neutral-0);
        border: 1px solid var(--color-sl-grey-neutral-300);
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.02);
        border-radius: 32px;
      }

      .search__icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        color: var(--color-vx-warm-neutral-700);
      }

      .search__input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-family: var(--font-family-primary);
        font-size: 14px;
        line-height: 160%;
        letter-spacing: -0.03em;
        color: var(--color-vx-warm-neutral-700);
        min-width: 0;
      }

      .search__input::placeholder {
        color: var(--color-sl-grey-neutral-500);
      }
    `,
  ];

  render() {
    return html`
      <div class="search">
        <svg
          class="search__icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
            fill="currentColor"
          />
        </svg>
        <input type="text" class="search__input" placeholder="Search for Star Wars characters" />
      </div>
    `;
  }
}
