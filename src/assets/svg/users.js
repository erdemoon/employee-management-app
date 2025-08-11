import {LitElement, html} from 'lit';

export class UsersIcon extends LitElement {
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
      style="padding: ${this.padding || ''}"
      stroke=${this.color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-users"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>`;
  }
}

customElements.define('users-icon', UsersIcon);
