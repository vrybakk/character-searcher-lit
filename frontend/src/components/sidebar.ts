import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-sidebar')
export class AppSidebar extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .sidebar {
      position: sticky;
      top: 40px;
      width: 100%;
      max-width: 300px;
      min-height: 330px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      box-sizing: border-box;
      background: var(--color-bw-white);
      border: 1px solid var(--color-vx-warm-neutral-200);
      box-shadow: var(--shadow-elevation-deep-1);
      border-radius: 16px;
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
      font-family: var(--font-family-primary);
      font-size: 20px;
      font-weight: 400;
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

    .sidebar__character-item:hover .sidebar__character-icon {
      background: var(--color-vx-warm-neutral-500);
    }

    .sidebar__character-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      background: var(--color-vx-warm-neutral-400);
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .sidebar__character-name {
      font-family: var(--font-family-primary);
      font-size: 18px;
      line-height: 22px;
      font-weight: 400;
      color: var(--color-vx-warm-neutral-700);
    }

    .sidebar__footer {
      font-family: var(--font-family-primary);
      font-size: 16px;
      line-height: 19px;
      font-weight: 400;
      letter-spacing: -0.03em;
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
  `;

  render() {
    return html`
      <div class="sidebar">
        <div class="sidebar__featured">
          <h2 class="sidebar__featured-header">Featured Characters:</h2>
          <div class="sidebar__character-list">
            <div class="sidebar__character-item">
              <div class="sidebar__character-icon"></div>
              <span class="sidebar__character-name">Lando Calrissian</span>
            </div>
            <div class="sidebar__character-item">
              <div class="sidebar__character-icon"></div>
              <span class="sidebar__character-name">Leia Organa</span>
            </div>
            <div class="sidebar__character-item">
              <div class="sidebar__character-icon"></div>
              <span class="sidebar__character-name">Darth Vader</span>
            </div>
          </div>
        </div>
        <div class="sidebar__footer">
          <span>2025 Star Wardens LTD.</span>
          <a href="#" class="sidebar__footer-link">About us</a>
        </div>
      </div>
    `;
  }
}
