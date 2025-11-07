import { css } from 'lit';

/**
 * CSS Reset for Lit components
 * This reset is applied within Shadow DOM to override user agent styles
 */
export const resetStyles = css`
  :host {
    font-family: var(--font-family-primary);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  p {
    margin: 0;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  input,
  textarea,
  select {
    font: inherit;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;
