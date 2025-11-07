import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from './base-element';

interface Character {
  id: number;
  name: string;
  description?: string;
  icon?: string;
}

@customElement('app-character-list')
export class AppCharacterList extends BaseElement {
  @property({ type: Array })
  declare characters: Character[];

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
        background: var(--color-vx-warm-neutral-400);
        border-radius: 50%;
      }

      .character-info {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
      }

      .character-title {
        padding-bottom: 12px;
      }

      .character-title-text {
        font-family: var(--font-family-primary);
        font-weight: 600;
        font-size: 16px;
        line-height: 160%;
        color: var(--color-sl-grey-neutral-700);
        margin: 0;
      }

      .character-description {
        padding-bottom: 16px;
      }

      .character-description-text {
        font-family: var(--font-family-primary);
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: var(--color-vx-warm-neutral-700);
        margin: 0;
      }

      .empty-state {
        padding: 40px 0;
        text-align: center;
        color: var(--color-vx-warm-neutral-500);
        font-family: var(--font-family-primary);
        font-size: 14px;
      }
    `,
  ];

  render() {
    const characters = this.characters || [];

    if (characters.length === 0) {
      return html`<div class="empty-state">No characters found</div>`;
    }

    return html`
      <div class="character-list">
        ${characters.map(
          (character) => html`
            <div class="character-item">
              <div class="character-icon-wrapper">
                <div class="icon-vector"></div>
              </div>
              <div class="character-info">
                <div class="character-title">
                  <h3 class="character-title-text">${character.name}</h3>
                </div>
                <div class="character-description">
                  <p class="character-description-text">${character.description || 'No description available.'}</p>
                </div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}
