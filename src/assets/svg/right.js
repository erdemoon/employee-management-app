import {LitElement, html} from 'lit';

export class RightIcon extends LitElement {
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
      class="feather feather-chevron-right"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>`;
  }
}

customElements.define('right-icon', RightIcon);
