import {LitElement, html} from 'lit';

export class XIcon extends LitElement {
  static properties = {
    color: {type: String},
    width: {type: String},
    height: {type: String},
    padding: {type: String},
  };

  render() {
    return html` <svg
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
      class="feather feather-x"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`;
  }
}

customElements.define('x-icon', XIcon);
