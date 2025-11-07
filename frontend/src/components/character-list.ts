import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getImageUrl } from '../config/api';
import type { Character } from '../services/api';
import { getCharacters } from '../services/api';
import { selectCharacter, setLoading } from '../services/app-state';
import { router } from '../services/router';
import { BaseElement } from './base-element';
import './loading-spinner';

type LoadingState = 'idle' | 'loading' | 'error';

@customElement('app-character-list')
export class AppCharacterList extends BaseElement {
  @state()
  private declare characters: Character[];

  @state()
  private declare loadingState: LoadingState;

  @state()
  private declare errorMessage: string;

  private unsubscribeRouter: (() => void) | null = null;
  private isInitialized: boolean = false;
  private currentSearchQuery: string | undefined = undefined;

  constructor() {
    super();
    this.characters = [];
    this.loadingState = 'idle';
    this.errorMessage = '';
  }

  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
      }

      .character-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        width: 100%;
        max-width: 620px;
        margin: 0 auto;
      }

      .character-item {
        display: flex;
        align-items: flex-start;
        padding-top: 12px;
        gap: 8px;
        width: 100%;
        border-bottom: 1px solid var(--color-vx-warm-neutral-300);
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      .character-item:hover {
        background: var(--color-vx-warm-neutral-100);
      }

      .character-icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
        width: 90px;
        flex-shrink: 0;
      }

      .icon-vector {
        width: 63px;
        height: 63px;
        border-radius: 50%;
        overflow: hidden;
      }

      .icon-vector img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        display: block;
      }

      .character-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        text-align: left;
      }

      .character-title {
        padding-bottom: 12px;
      }

      .character-title-text {
        font-size: var(--font-size-base);
        line-height: var(--line-height-relaxed);
        font-weight: var(--font-weight-semibold);
        color: var(--color-sl-grey-neutral-700);
        margin: 0;
      }

      .character-birth-year {
        font-weight: var(--font-weight-normal);
        color: var(--color-vx-warm-neutral-500);
      }

      .character-description {
        padding-bottom: 16px;
      }

      .character-description-text {
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
        font-weight: var(--font-weight-normal);
        color: var(--color-vx-warm-neutral-700);
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .empty-state {
        padding: 40px 0;
        text-align: center;
        color: var(--color-vx-warm-neutral-500);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-normal);
      }

      .error-state {
        padding: 40px 0;
        text-align: center;
        color: var(--color-annotation-style-pink);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-normal);
      }

      @media (max-width: 768px) {
        .character-list {
          padding: 4px;
        }

        .character-item {
          padding-top: 8px;
          gap: 8px;
        }

        .character-icon-wrapper {
          width: 70px;
          padding: 8px 0;
        }

        .icon-vector {
          width: 50px;
          height: 50px;
        }

        .empty-state,
        .error-state {
          padding: 24px 0;
        }
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();

    const route = router.getCurrentRoute();
    const searchQuery = route.path === '/search' && route.query.q ? route.query.q : undefined;

    if (!this.isInitialized) {
      this.isInitialized = true;
      this.currentSearchQuery = searchQuery;
      this.fetchCharacters(searchQuery);

      this.unsubscribeRouter = router.onRouteChange((route) => {
        if (route.path === '/search') {
          const query = route.query.q || undefined;
          if (query !== this.currentSearchQuery) {
            this.currentSearchQuery = query;
            this.fetchCharacters(query);
          }
        } else {
          this.currentSearchQuery = undefined;
          this.characters = [];
          this.loadingState = 'idle';
          this.errorMessage = '';
        }
      });
    } else {
      if (searchQuery !== this.currentSearchQuery) {
        this.currentSearchQuery = searchQuery;
        this.fetchCharacters(searchQuery);
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
      this.unsubscribeRouter = null;
    }
  }

  private async fetchCharacters(searchQuery?: string): Promise<void> {
    if (this.loadingState === 'loading' && searchQuery === this.currentSearchQuery) {
      return;
    }

    this.currentSearchQuery = searchQuery;
    this.loadingState = 'loading';
    this.errorMessage = '';
    setLoading(true);
    this.requestUpdate();

    try {
      const results = await getCharacters(searchQuery);
      this.characters = results;
      this.loadingState = 'idle';
    } catch (error) {
      this.loadingState = 'error';
      this.errorMessage = error instanceof Error ? error.message : 'Failed to fetch characters. Please try again.';
      this.characters = [];
    } finally {
      setLoading(false);
    }

    this.requestUpdate();
  }

  private handleCharacterClick(characterId: number): void {
    selectCharacter(characterId);
  }

  render() {
    if (this.loadingState === 'loading') {
      return html`<app-loading-spinner></app-loading-spinner>`;
    }

    if (this.loadingState === 'error') {
      return html`<div class="error-state">${this.errorMessage}</div>`;
    }

    if (this.characters.length === 0) {
      return html`<div class="empty-state">No characters found</div>`;
    }

    return html`
      <div class="character-list">
        ${this.characters.map(
          (character) => html`
            <div class="character-item" @click=${() => this.handleCharacterClick(character.id)}>
              <div class="character-icon-wrapper">
                ${character.icon
                  ? html`<div class="icon-vector">
                      <img src="${getImageUrl(character.icon)}" alt="${character.name}" />
                    </div>`
                  : html`<div class="icon-vector"></div>`}
              </div>
              <div class="character-info">
                <div class="character-title">
                  <h3 class="character-title-text">
                    ${character.name}${character.birth_year
                      ? html` <span class="character-birth-year">(${character.birth_year})</span>`
                      : ''}
                  </h3>
                </div>
                ${character.description
                  ? html`
                      <div class="character-description">
                        <p class="character-description-text">${character.description}</p>
                      </div>
                    `
                  : ''}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}
