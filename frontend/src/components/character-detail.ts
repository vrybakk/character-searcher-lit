import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from './base-element';

interface CharacterDetail {
  id: number;
  name: string;
  birth_year?: string;
  gender?: string;
  homeworld?: string;
  films?: string;
  description?: string;
  traits?: string;
  key_moments?: string;
  relationships?: string;
  icon?: string;
}

@customElement('app-character-detail')
export class AppCharacterDetail extends BaseElement {
  @property({ type: Object })
  declare character: CharacterDetail | null;

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
        font-family: var(--font-family-primary);
        text-align: left;
      }

      .character-detail__title-wrapper {
        padding-bottom: 20px;
      }

      .character-detail__title {
        font-family: var(--font-family-primary);
        font-weight: 400;
        font-size: 32px;
        line-height: 38px;
        letter-spacing: -0.03em;
        color: var(--color-vx-warm-neutral-700);
        margin: 0;
      }

      .character-detail__paragraph-wrapper {
        padding-bottom: 16px;
      }

      .character-detail__paragraph {
        font-family: var(--font-family-primary);
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: var(--color-vx-warm-neutral-700);
        margin: 0;
      }

      .character-detail__section-title-wrapper {
        padding-bottom: 12px;
      }

      .character-detail__section-title {
        font-family: var(--font-family-primary);
        font-weight: 600;
        font-size: 16px;
        line-height: 160%;
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
        font-family: var(--font-family-primary);
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        color: var(--color-sl-grey-neutral-700);
        margin-bottom: 0;
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
      return html`<div>No character selected</div>`;
    }

    const traits = this.parseJsonField(this.character.traits);
    const keyMoments = this.parseJsonField(this.character.key_moments);
    const relationships = this.parseJsonField(this.character.relationships);

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
