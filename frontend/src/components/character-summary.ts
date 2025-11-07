import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from './base-element';

interface CharacterSummary {
  id: number;
  name: string;
  gender?: string;
  homeworld?: string;
  films?: string;
  icon?: string;
}

@customElement('app-character-summary')
export class AppCharacterSummary extends BaseElement {
  @property({ type: Object })
  declare character: CharacterSummary | null;

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
        position: absolute;
        width: 218px;
        height: 218px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: var(--color-vx-warm-neutral-400);
        border-radius: 50%;
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
        font-family: var(--font-family-primary);
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.03em;
        color: var(--color-vx-warm-neutral-400);
        border-bottom: 1px solid var(--color-vx-warm-neutral-300);
      }

      .character-summary__value {
        margin-top: 8px;
        font-family: var(--font-family-primary);
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: -0.03em;
        color: var(--color-vx-warm-neutral-700);
      }
    `,
  ];

  private parseJsonField(field?: string): string[] {
    if (!field) return [];
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      return field.split('\n').filter((item) => item.trim());
    }
  }

  render() {
    if (!this.character) {
      return html``;
    }

    const films = this.parseJsonField(this.character.films);

    return html`
      <div class="character-summary">
        <div class="character-summary__icon-container">
          <div class="character-summary__icon"></div>
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
