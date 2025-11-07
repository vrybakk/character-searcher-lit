import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Character } from '../services/api';
import { getCharacterById } from '../services/api';
import { router } from '../services/router';
import { updateDocumentTitle } from '../utils/meta-titles';
import { parseJsonField } from '../utils/parse-json-field';
import { BaseElement } from './base-element';
import './loading-spinner';

type LoadingState = 'idle' | 'loading' | 'error';

@customElement('app-character-detail')
export class AppCharacterDetail extends BaseElement {
  @state()
  private declare character: Character | null;

  @state()
  private declare loadingState: LoadingState;

  @state()
  private declare errorMessage: string;

  private unsubscribeRouter: (() => void) | null = null;
  private isInitialized: boolean = false;

  constructor() {
    super();
    this.character = null;
    this.loadingState = 'idle';
    this.errorMessage = '';
  }

  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .character-detail {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 620px;
        text-align: left;
      }

      .character-detail__title-wrapper {
        padding-bottom: 20px;
      }

      .character-detail__title {
        font-size: var(--font-size-xl);
        line-height: var(--line-height-38);
        font-weight: var(--font-weight-normal);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-700);
        margin: 0;
      }

      .character-detail__paragraph-wrapper {
        padding-bottom: 16px;
      }

      .character-detail__paragraph {
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
        font-weight: var(--font-weight-normal);
        color: var(--color-vx-warm-neutral-700);
        margin: 0;
      }

      .character-detail__section-title-wrapper {
        padding-bottom: 12px;
      }

      .character-detail__section-title {
        font-size: var(--font-size-base);
        line-height: var(--line-height-relaxed);
        font-weight: var(--font-weight-semibold);
        color: var(--color-sl-grey-neutral-700);
        margin: 0;
      }

      .character-detail__list-wrapper {
        padding-bottom: 16px;
      }

      .character-detail__list {
        margin: 0;
        padding-left: 24px;
        list-style: disc;
      }

      .character-detail__list-item {
        font-size: var(--font-size-sm);
        line-height: var(--line-height-relaxed);
        font-weight: var(--font-weight-normal);
        color: var(--color-sl-grey-neutral-700);
        margin-bottom: 0;
      }

      .error-state {
        padding: 40px 0;
        text-align: center;
        color: var(--color-annotation-style-pink);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-normal);
      }

      @media (max-width: 768px) {
        .character-detail {
          max-width: 100%;
        }

        .character-detail__title-wrapper {
          padding-bottom: 16px;
        }

        .character-detail__title {
          font-size: var(--font-size-lg);
          line-height: var(--line-height-normal);
        }

        .character-detail__paragraph-wrapper {
          padding-bottom: 12px;
        }

        .character-detail__section-title-wrapper {
          padding-bottom: 8px;
        }

        .character-detail__list-wrapper {
          padding-bottom: 12px;
        }

        .character-detail__list {
          padding-left: 20px;
        }

        .error-state {
          padding: 24px 0;
        }
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();

    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;

    const route = router.getCurrentRoute();
    if (route.path.startsWith('/character/') && route.params.id) {
      const characterId = parseInt(route.params.id, 10);
      if (!isNaN(characterId)) {
        this.fetchCharacter(characterId);
      }
    }

    this.unsubscribeRouter = router.onRouteChange((route) => {
      if (route.path.startsWith('/character/') && route.params.id) {
        const characterId = parseInt(route.params.id, 10);
        if (!isNaN(characterId)) {
          this.fetchCharacter(characterId);
        }
      } else {
        this.character = null;
        this.loadingState = 'idle';
        this.errorMessage = '';
      }
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.isInitialized = false;
    if (this.unsubscribeRouter) {
      this.unsubscribeRouter();
      this.unsubscribeRouter = null;
    }
  }

  private async fetchCharacter(characterId: number): Promise<void> {
    this.loadingState = 'loading';
    this.errorMessage = '';
    this.character = null;
    this.requestUpdate();

    try {
      const character = await getCharacterById(characterId);
      this.character = character;
      this.loadingState = 'idle';

      updateDocumentTitle(character.name);

      window.dispatchEvent(
        new CustomEvent('character-loaded', {
          detail: { character },
        })
      );
    } catch (error) {
      this.loadingState = 'error';
      this.errorMessage = error instanceof Error ? error.message : 'Failed to fetch character. Please try again.';
      this.character = null;
    }

    this.requestUpdate();
  }

  render() {
    if (this.loadingState === 'loading') {
      return html`<app-loading-spinner></app-loading-spinner>`;
    }

    if (this.loadingState === 'error') {
      return html`<div class="error-state">${this.errorMessage}</div>`;
    }

    if (!this.character) {
      return html`<div class="character-detail"></div>`;
    }

    const traits = parseJsonField(this.character.traits);
    const keyMoments = parseJsonField(this.character.key_moments);
    const relationships = parseJsonField(this.character.relationships);

    return html`
      <div class="character-detail">
        <div class="character-detail__title-wrapper">
          <h1 class="character-detail__title">${this.character.name}</h1>
        </div>

        ${this.character.description
          ? html`
              <div class="character-detail__paragraph-wrapper">
                <p class="character-detail__paragraph">${this.character.description}</p>
              </div>
            `
          : ''}
        ${traits.length > 0
          ? html`
              <div class="character-detail__section-title-wrapper">
                <h2 class="character-detail__section-title">Core Traits</h2>
              </div>
              <div class="character-detail__list-wrapper">
                <ul class="character-detail__list">
                  ${traits.map((trait) => html`<li class="character-detail__list-item">${trait}</li>`)}
                </ul>
              </div>
            `
          : ''}
        ${keyMoments.length > 0
          ? html`
              <div class="character-detail__section-title-wrapper">
                <h2 class="character-detail__section-title">Key Moments</h2>
              </div>
              <div class="character-detail__list-wrapper">
                <ul class="character-detail__list">
                  ${keyMoments.map((moment) => html`<li class="character-detail__list-item">${moment}</li>`)}
                </ul>
              </div>
            `
          : ''}
        ${relationships.length > 0
          ? html`
              <div class="character-detail__section-title-wrapper">
                <h2 class="character-detail__section-title">Important Relationships</h2>
              </div>
              <div class="character-detail__list-wrapper">
                <ul class="character-detail__list">
                  ${relationships.map((rel) => html`<li class="character-detail__list-item">${rel}</li>`)}
                </ul>
              </div>
            `
          : ''}
      </div>
    `;
  }
}
