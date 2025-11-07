import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getImageUrl } from '../config/api';
import type { Character } from '../services/api';
import '../types/events';
import { parseJsonField } from '../utils/parse-json-field';
import { BaseElement } from './base-element';

@customElement('app-character-summary')
export class AppCharacterSummary extends BaseElement {
  @state()
  private declare character: Character | null;

  constructor() {
    super();
    this.character = null;
  }

  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .character-summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
      }

      .character-summary__icon-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 32px 20px;
        width: 100%;
        min-height: 282px;
        background: var(--color-vx-warm-neutral-50);
        border-radius: 8px;
        position: relative;
      }

      .character-summary__icon {
        width: 218px;
        height: 218px;
        border-radius: 50%;
        overflow: hidden;
      }

      .character-summary__icon img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        display: block;
      }

      .character-summary__info {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
      }

      .character-summary__info-row {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;
      }

      .character-summary__label {
        padding-bottom: 4px;
        display: inline-block;
        width: 100%;
        font-size: var(--font-size-base);
        line-height: var(--line-height-19);
        font-weight: var(--font-weight-semibold);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-400);
        border-bottom: 1px solid var(--color-vx-warm-neutral-300);
      }

      .character-summary__value {
        margin-top: 8px;
        font-size: var(--font-size-base);
        line-height: var(--line-height-19);
        font-weight: var(--font-weight-normal);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-700);
      }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('character-loaded', this.handleCharacterLoaded);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('character-loaded', this.handleCharacterLoaded);
  }

  private handleCharacterLoaded = (e: WindowEventMap['character-loaded']): void => {
    this.character = e.detail?.character || null;
    this.requestUpdate();
  };

  render() {
    if (!this.character) {
      return html``;
    }

    const films = parseJsonField(this.character.films);

    return html`
      <div class="character-summary">
        <div class="character-summary__icon-container">
          ${this.character.icon
            ? html`<div class="character-summary__icon">
                <img src="${getImageUrl(this.character.icon)}" alt="${this.character.name}" />
              </div>`
            : html`<div class="character-summary__icon"></div>`}
        </div>
        <div class="character-summary__info">
          <div class="character-summary__info-row">
            <span class="character-summary__label">Name</span>
            <span class="character-summary__value">${this.character.name}</span>
          </div>
          ${this.character.gender
            ? html`
                <div class="character-summary__info-row">
                  <span class="character-summary__label">Gender</span>
                  <span class="character-summary__value">${this.character.gender}</span>
                </div>
              `
            : ''}
          ${this.character.homeworld
            ? html`
                <div class="character-summary__info-row">
                  <span class="character-summary__label">Homeworld</span>
                  <span class="character-summary__value">${this.character.homeworld}</span>
                </div>
              `
            : ''}
          ${films.length > 0
            ? films.map(
                (film) => html`
                  <div class="character-summary__info-row">
                    <span class="character-summary__label">Films</span>
                    <span class="character-summary__value">${film}</span>
                  </div>
                `
              )
            : ''}
        </div>
      </div>
    `;
  }
}
