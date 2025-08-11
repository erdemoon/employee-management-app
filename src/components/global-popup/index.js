import {LitElement, html, css} from 'lit';
import '../../assets/svg/x';
import {getLocalizedData} from '../../service/localization';

export class GlobalPopup extends LitElement {
  static properties = {
    open: {type: Boolean},
    data: {type: Object},
  };

  constructor() {
    super();
    this.open = false;
    this.data = {};

    window.addEventListener('show-popup', (e) => {
      this.data = e.detail.data;
      this.open = true;
    });

    window.addEventListener('hide-popup', () => {
      this.open = false;
    });
  }

  static styles = css`
    .popup-parent {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: -999;
    }
    .popup-parent.open {
      opacity: 1;
      z-index: 999;
    }
    .popup {
      background: white;
      padding: 1rem 1rem;
      border-radius: 0.5rem;
      width: 30rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .popup-title {
      color: #ff6200;
      margin: 0;
    }

    .popup-button-parent {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 0.75rem;
    }

    .popup-button-cancel {
      color: #525099;
      background-color: transparent;
      border: 0.1rem solid #525099;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }

    .popup-button-proceed {
      color: #fff;
      background-color: #ff6200;
      border: 0.1rem solid #ff6200;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <div class=${this.open ? 'popup-parent open' : 'popup-parent'}>
        <div class="popup">
          <div class="popup-header">
            <h2 class="popup-title">${getLocalizedData('confirm_delete')}</h2>
            <x-icon
              @click=${() => (this.open = false)}
              style="cursor: pointer;"
              width="2.5rem"
              height="2.5rem"
              color="#ff6200"
            ></x-icon>
          </div>
          <p>${this.data.message}</p>
          <div class="popup-button-parent">
            <button
              @click=${() => {
                this.data.action();
                this.open = false;
              }}
              class="popup-button-proceed"
            >
              ${getLocalizedData('proceed')}
            </button>
            <button
              @click=${() => (this.open = false)}
              class="popup-button-cancel"
            >
              ${getLocalizedData('cancel')}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('global-popup', GlobalPopup);
