import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseElement } from './base-element.js';

@customElement('app-homepage')
export class AppHomepage extends BaseElement {
  static styles = [
    ...super.styles,
    css`
      :host {
        display: block;
      }

      .homepage {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        max-width: 620px;
        margin: 0 auto;
        font-family: var(--font-family-primary);
        font-size: 14px;
        line-height: 160%;
        font-weight: 400;
        color: var(--color-vx-warm-neutral-700);
        text-align: left;
        gap: 16px;
      }

      .homepage__heading {
        width: 100%;
        margin-bottom: 4px;
        font-size: 32px;
        line-height: 38px;
        letter-spacing: -0.03em;
      }

      .homepage__list {
        color: var(--color-sl-grey-neutral-700);
        margin: 0;
        padding-left: 24px;
        list-style: disc;
      }
    `,
  ];

  render() {
    return html`
      <div class="homepage">
        <h1 class="homepage__heading">Welcome to StarFolk Wiki</h1>
        <p class="homepage__paragraph">
          Step into a galaxy of heroes, villains, rebels, and rulers. StarFolk Wiki is your guide to the characters who
          shaped the Star Wars universe — from the legendary Jedi and Sith, to smugglers, droids, and everyone in
          between.
        </p>
        <h2 class="homepage__subheading">Here you'll find:</h2>
        <ul class="homepage__list">
          <li class="homepage__list-item">Detailed profiles of characters across the saga</li>
          <li class="homepage__list-item">Backgrounds, homeworlds, and key appearances</li>
          <li class="homepage__list-item">Connections between stories, films, and series</li>
          <li class="homepage__list-item">Fun facts and trivia that bring the galaxy to life</li>
        </ul>
        <p class="homepage__paragraph">
          Whether you're a long-time fan or just beginning your journey, StarFolk Wiki is the one place where every
          story, big or small, finds its place among the stars.
        </p>
        <p class="homepage__paragraph">So grab your lightsaber, choose your side, and start exploring!</p>
      </div>
    `;
  }
}
