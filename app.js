import {LitElement, html} from 'lit';
import './src/router';
import './src/components/global-popup';

export class RootElement extends LitElement {
  createRenderRoot() {
    return this; // Disable shadow DOM (renders into light DOM)
  }

  render() {
    return html`<app-router>
      <global-popup></global-popup>
    </app-router>`;
  }
}

customElements.define('root-element', RootElement);
