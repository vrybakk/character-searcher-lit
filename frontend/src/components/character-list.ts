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
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 12px 0px 0px;
        gap: 8px;
        width: 100%;
        min-height: 110px;
        border-bottom: 1px solid var(--color-vx-warm-neutral-300);
        flex: none;
        cursor: pointer;
        transition: background-color 0.2s ease;
        text-align: left;
      }

      .character-item:hover {
        background: var(--color-vx-warm-neutral-100);
      }

      .character-icon-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px 0px;
        width: 90px;
        height: 80px;
        border-radius: 2px;
        flex: none;
        flex-shrink: 0;
      }

      .icon-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0px;
        width: 63px;
        height: 63px;
        position: relative;
        flex: none;
      }

      .icon-vector {
        width: 63px;
        height: 63px;
        background: var(--color-vx-warm-neutral-400);
        border-radius: 50%;
        flex: none;
        z-index: 0;
      }

      .character-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        width: 100%;
        min-height: 98px;
        flex: 1;
        box-sizing: border-box;
      }

      .character-title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 0px 0px 12px;
        gap: 8px;
        width: 100%;
        min-height: 38px;
        flex: none;
        align-self: stretch;
      }

      .character-title-text {
        width: 100%;
        min-height: 26px;
        font-family: var(--font-family-primary);
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 160%;
        color: var(--color-sl-grey-neutral-700);
        flex: none;
        flex-grow: 1;
        margin: 0;
      }

      .character-description {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0px 0px 16px;
        gap: 8px;
        width: 100%;
        min-height: 60px;
        flex: none;
        align-self: stretch;
      }

      .character-description-text {
        width: 100%;
        min-height: 44px;
        font-family: var(--font-family-primary);
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: var(--color-vx-warm-neutral-700);
        flex: none;
        flex-grow: 1;
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
                <div class="icon-container">
                  <div class="icon-vector"></div>
                </div>
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
