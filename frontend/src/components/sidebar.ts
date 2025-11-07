import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { getImageUrl } from '../config/api';
import type { Character } from '../services/api';
import { getCharacters } from '../services/api';
import { selectCharacter } from '../services/app-state';
import { BaseElement } from './base-element';
import './loading-spinner';
import './sidebar-wrapper';

@customElement('app-sidebar')
export class AppSidebar extends BaseElement {
  @state()
  private declare featuredCharacters: Character[];

  @state()
  private declare isLoading: boolean;

  constructor() {
    super();
    this.featuredCharacters = [];
    this.isLoading = true;
  }

  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .sidebar__featured {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 24px;
        width: 100%;
        flex: none;
        align-self: stretch;
        z-index: 0;
      }

      .sidebar__featured-header {
        width: 100%;
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-normal);
        color: var(--color-vx-warm-neutral-700);
        text-align: left;
        margin: 0;
      }

      .sidebar__character-list {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 12px;
        width: 100%;
      }

      .sidebar__character-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        gap: 12px;
        width: 100%;
        height: 40px;
        background: var(--color-vx-warm-neutral-50);
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        box-sizing: border-box;
      }

      .sidebar__character-item:hover {
        background: var(--color-vx-warm-neutral-100);
      }

      .sidebar__character-item:hover .sidebar__character-icon:not(:has(img)) {
        background: var(--color-vx-warm-neutral-500);
      }

      .sidebar__character-icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        border-radius: 4px;
        overflow: hidden;
      }

      .sidebar__character-icon img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        object-fit: cover;
        display: block;
      }

      .sidebar__character-name {
        font-size: var(--font-size-md);
        line-height: var(--line-height-22);
        font-weight: var(--font-weight-normal);
        color: var(--color-vx-warm-neutral-700);
      }

      .sidebar__footer {
        font-size: var(--font-size-base);
        line-height: var(--line-height-19);
        font-weight: var(--font-weight-normal);
        letter-spacing: var(--letter-spacing-tight);
        color: var(--color-vx-warm-neutral-400);
      }

      .sidebar__footer span {
        margin-right: 8px;
        padding-right: 8px;
        border-right: 1px solid var(--color-vx-warm-neutral-400);
      }

      .sidebar__footer-link {
        color: var(--color-orange-default);
        text-decoration: underline;
        cursor: pointer;
      }

      .sidebar__footer-link:hover {
        opacity: 0.8;
      }

      @media (max-width: 768px) {
        .sidebar__featured {
          gap: 16px;
        }

        .sidebar__character-list {
          gap: 8px;
        }
      }
    `,
  ];

  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.fetchFeaturedCharacters();
  }

  private async fetchFeaturedCharacters(): Promise<void> {
    try {
      this.isLoading = true;
      const allCharacters = await getCharacters();
      const uniqueCharacters = Array.from(new Map(allCharacters.map((char) => [char.id, char])).values());
      this.featuredCharacters = uniqueCharacters.slice(0, 3);
    } catch (error) {
      this.featuredCharacters = [];
    } finally {
      this.isLoading = false;
    }
  }

  private handleCharacterClick(characterId: number): void {
    selectCharacter(characterId);
  }

  render() {
    return html`
      <app-sidebar-wrapper>
        <div class="sidebar__featured">
          <h2 class="sidebar__featured-header">Featured Characters:</h2>
          ${this.isLoading
            ? html`<app-loading-spinner></app-loading-spinner>`
            : html`
                <div class="sidebar__character-list">
                  ${this.featuredCharacters.map(
                    (character) => html`
                      <div class="sidebar__character-item" @click=${() => this.handleCharacterClick(character.id)}>
                        ${character.icon
                          ? html`<div class="sidebar__character-icon">
                              <img src="${getImageUrl(character.icon)}" alt="${character.name}" />
                            </div>`
                          : html`<div class="sidebar__character-icon"></div>`}
                        <span class="sidebar__character-name">${character.name}</span>
                      </div>
                    `
                  )}
                </div>
              `}
        </div>
        <div class="sidebar__footer">
          <span>2025 Star Wardens LTD.</span>
          <a href="#" class="sidebar__footer-link">About us</a>
        </div>
      </app-sidebar-wrapper>
    `;
  }
}
