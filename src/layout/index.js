import {LitElement, html, css} from 'lit';

export class PageLayout extends LitElement {
  static styles = css`
    .layout-parent {
      padding: 0.75rem 3rem;
    }
  `;

  render() {
    return html`
      <div class="layout-parent">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('page-layout', PageLayout);
