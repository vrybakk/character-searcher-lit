import { LitElement } from 'lit';
import { resetStyles } from '../styles/reset.css.js';

export class BaseElement extends LitElement {
  static styles = [resetStyles];
}
