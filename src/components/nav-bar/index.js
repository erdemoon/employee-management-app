import {LitElement, html, css} from 'lit';
import '../../assets/svg/users.js';
import '../../assets/svg/plus.js';
import {getLanguage, setLanguage} from '../../store/actions.js';
import {connect} from '../../store/connect.js';
import {
  getLocalizedData,
  getSupportedLanguages,
} from '../../service/localization/index.js';

export class NavBar extends connect(LitElement) {
  static properties = {
    currentPath: {type: String},
  };

  constructor() {
    super();
    this.currentPath = window.location.pathname;

    window.addEventListener('vaadin-router-location-changed', (e) => {
      this.currentPath = e.detail.location.pathname;
    });
  }

  static styles = css`
    .nav-bar-parent {
      height: 4rem;
      background-color: #fff;
      display: flex;
      align-items: center;
      font-weight: bold;
      padding: 0rem 1rem;
      justify-content: space-between;
    }

    .nav-buttons-parent .active {
      color: #ff6200;
    }

    .nav-buttons-parent .inactive {
      color: #ff924f;
    }

    .nav-buttons-parent {
      display: flex;
    }

    .local-buttons-parent {
      display: flex;
      margin-left: 1rem;
    }

    a {
      text-decoration: none;
      transition: 0.2s ease;
      padding: 0rem 0rem 0rem 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  `;

  render() {
    return html`<div class="nav-bar-parent">
      <div class="brand-parent">
        <span>ING</span>
      </div>
      <div class="nav-buttons-parent">
        <a class=${this.currentPath === '/' ? 'active' : 'inactive'} href="/"
          ><users-icon
            .width=${'1.25rem'}
            .height=${'1.25rem'}
            .color=${this.currentPath === '/' ? '#ff6200' : '#ff924f'}
            .padding=${'0rem 0.25rem'}
          ></users-icon>
          ${getLocalizedData('employees')}</a
        >
        <a
          class="${this.currentPath === '/add-employee'
            ? 'active'
            : 'inactive'}"
          href="/add-employee"
        >
          <plus-icon
            .width=${'1.25rem'}
            .height=${'1.25rem'}
            .color=${this.currentPath === '/add-employee'
              ? '#ff6200'
              : '#ff924f'}
            .padding=${'0rem 0.25rem'}
          ></plus-icon
          >${getLocalizedData('add_new')}</a
        >
        <div class="local-buttons-parent">
          ${getSupportedLanguages().map(
            (lang) => html` <a
              @click=${() => {
                setLanguage(lang);
              }}
              class="${getLanguage() === lang ? 'active' : 'inactive'}"
              >${lang.toUpperCase()}</a
            >`
          )}
        </div>
      </div>
    </div>`;
  }
}
customElements.define('nav-bar', NavBar);
