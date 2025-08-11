import {LitElement, html} from 'lit';

export class GridIcon extends LitElement {
  static properties = {
    color: {type: String},
    width: {type: String},
    height: {type: String},
    padding: {type: String},
  };

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        width=${this.width}
        height=${this.height}
        stroke=${this.color}
        style="padding: ${this.padding || ''}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-grid"
      >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    `;
  }
}

customElements.define('grid-icon', GridIcon);
