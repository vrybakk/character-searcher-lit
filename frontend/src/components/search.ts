import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EVENTS, getState, setSearchQuery } from '../services/app-state';
import { router } from '../services/router';
import '../types/events';
import { BaseElement } from './base-element';

@customElement('app-search')
export class AppSearch extends BaseElement {
  @state()
  private declare searchValue: string;

  @state()
  private declare isLoading: boolean;

  @state()
  private declare isFocused: boolean;

  private debounceTimer: number | null = null;
  private inputElement: HTMLInputElement | null = null;
  private unsubscribeRouter: (() => void) | null = null;

  constructor() {
    super();
    this.searchValue = '';
    this.isLoading = false;
    this.isFocused = false;
  }

  connectedCallback(): void {
    super.connectedCallback();

    const route = router.getCurrentRoute();
    if (route.path === '/search' && route.query.q) {
      this.searchValue = route.query.q;
    } else {
      this.searchValue = '';
    }

    window.addEventListener(EVENTS.STATE_UPDATED, this.handleStateUpdate);
    const state = getState();
    this.isLoading = state.isLoading;

    this.unsubscribeRouter = router.onRouteChange((route) => {
      if (route.path === '/search' && route.query.q) {
        this.searchValue = route.query.q;
      } else if (route.path === '/' || route.path.startsWith('/character/')) {
        this.searchValue = '';
      }
      this.requestUpdate();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(EVENTS.STATE_UPDATED, this.handleStateUpdate);
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
    }
  }

  private handleStateUpdate = (): void => {
    const state = getState();
    this.isLoading = state.isLoading;
    this.requestUpdate();
  };

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
        padding: 8px 16px;
        gap: 8px;
        width: 100%;
        height: 48px;
        background: var(--color-sl-color-neutral-0);
        border: 1px solid var(--color-sl-grey-neutral-300);
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.02);
        border-radius: 32px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .search:focus-within {
        border-color: var(--color-vx-warm-neutral-700);
        box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.04);
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
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
        font-weight: var(--font-weight-normal);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-700);
        min-width: 0;
      }

      .search__input::placeholder {
        color: var(--color-sl-grey-neutral-500);
      }

      .search__clear {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        cursor: pointer;
        padding: 0;
        border: none;
        background: transparent;
        transition: opacity 0.2s ease;
      }

      .search__clear--hidden {
        opacity: 0;
        pointer-events: none;
      }

      .search__clear:not(.search__clear--hidden):hover {
        opacity: 0.7;
      }

      .search__clear:not(.search__clear--hidden):focus {
        outline: 2px solid var(--color-vx-warm-neutral-700);
        outline-offset: 2px;
        border-radius: 2px;
      }

      .search__clear:not(.search__clear--hidden):active {
        opacity: 0.6;
      }

      .search__clear-icon {
        width: 16px;
        height: 16px;
        display: block;
      }

      .search__loading {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        border: 2px solid var(--color-vx-warm-neutral-200);
        border-top-color: var(--color-vx-warm-neutral-700);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 768px) {
        .search {
          padding: 6px 12px;
          height: 44px;
        }
      }

      @media (max-width: 480px) {
        .search {
          padding: 6px 10px;
          height: 40px;
        }
      }
    `,
  ];

  private handleInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    this.searchValue = value;

    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      setSearchQuery(value.trim());
    }, 400);
  }

  private handleFocus(): void {
    this.isFocused = true;
  }

  private handleBlur(): void {
    this.isFocused = false;
  }

  firstUpdated(): void {
    this.inputElement = this.shadowRoot?.querySelector('.search__input') as HTMLInputElement;
  }

  private handleClear(): void {
    this.searchValue = '';
    if (this.inputElement) {
      this.inputElement.value = '';
      this.inputElement.focus();
    }
    setSearchQuery('');
  }

  render() {
    return html`
      <div class="search">
        ${this.isLoading
          ? html`<div class="search__loading"></div>`
          : html`
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
            `}
        <input
          type="text"
          class="search__input"
          placeholder="Search for Star Wars characters"
          .value=${this.searchValue}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />
        <button
          type="button"
          class="search__clear ${!this.searchValue ? 'search__clear--hidden' : ''}"
          @click=${this.handleClear}
          aria-label="Clear search"
        >
          <svg
            class="search__clear-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45118 4.84171 4.45118 5.15829 4.64645 5.35355L7.29289 8L4.64645 10.6464C4.45118 10.8417 4.45118 11.1583 4.64645 11.3536C4.84171 11.5488 5.15829 11.5488 5.35355 11.3536L8 8.70711L10.6464 11.3536C10.8417 11.5488 11.1583 11.5488 11.3536 11.3536C11.5488 11.1583 11.5488 10.8417 11.3536 10.6464L8.70711 8L11.3536 5.35355C11.5488 5.15829 11.5488 4.84171 11.3536 4.64645C11.1583 4.45118 10.8417 4.45118 10.6464 4.64645L8 7.29289L5.35355 4.64645Z"
              fill="#787474"
            />
          </svg>
        </button>
      </div>
    `;
  }
}
