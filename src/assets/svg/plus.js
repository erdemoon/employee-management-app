import {LitElement, html} from 'lit';

export class PlusIcon extends LitElement {
  static properties = {
    color: {type: String},
    width: {type: String},
    height: {type: String},
    padding: {type: String},
  };

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      width=${this.width}
      height=${this.height}
      viewBox="0 0 24 24"
      fill="none"
      stroke=${this.color}
      style="padding: ${this.padding || ''}"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-plus"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>`;
  }
}

customElements.define('plus-icon', PlusIcon);
