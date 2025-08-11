import {LitElement, html, css} from 'lit';
import {removeEmployee} from '../../store/actions';
import {Router} from '@vaadin/router';
import {getLocalizedData} from '../../service/localization';

export class ListGrid extends LitElement {
  static properties = {
    data: {type: Array},
  };

  constructor() {
    super();
    this.data = [];
  }

  static styles = css`
    .grid-parent {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    }

    .grid-item-parent {
      background-color: #fff;
      margin: 1rem;
      padding: 1rem;
    }

    .grid-item-info-parent {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .grid-item-label-parent {
      margin: 1rem 0rem;
    }

    .grid-item-label {
      color: rgb(145, 145, 145);
      font-size: 1rem;
    }

    .grid-item-value {
      font-size: 1.25rem;
    }

    .grid-item-edit-button {
      background-color: #525099;
      color: #fff;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      cursor: pointer;
    }

    .grid-item-trash-button {
      background-color: #ff6200;
      color: #fff;
      border: none;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;
      cursor: pointer;
    }

    .grid-item-button-parent {
      display: flex;
      gap: 1rem;
    }
  `;

  render() {
    return html` <div class="grid-parent">
      ${this.data?.map(
        (el) => html` <div class="grid-item-parent">
          <div class="grid-item-info-parent">
            <div class="grid-item-label-parent">
              <div class="grid-item-label">
                ${getLocalizedData('first_name')}
              </div>
              <div class="grid-item-value">${el.firstName}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">
                ${getLocalizedData('last_name')}
              </div>
              <div class="grid-item-value">${el.lastName}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">
                ${getLocalizedData('date_of_employment')}
              </div>
              <div class="grid-item-value">${el.dateOfEmployment}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">
                ${getLocalizedData('date_of_birth')}
              </div>
              <div class="grid-item-value">${el.dateOfBirth}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">${getLocalizedData('phone')}</div>
              <div class="grid-item-value">${el.phone}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">${getLocalizedData('email')}</div>
              <div class="grid-item-value">${el.email}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">
                ${getLocalizedData('department')}
              </div>
              <div class="grid-item-value">${el.department}</div>
            </div>
            <div class="grid-item-label-parent">
              <div class="grid-item-label">${getLocalizedData('position')}</div>
              <div class="grid-item-value">${el.position}</div>
            </div>
          </div>
          <div class="grid-item-button-parent">
            <button
              @click=${() => {
                Router.go(`/edit-employee-${el.uid}`);
              }}
              class="grid-item-edit-button"
            >
              <edit-icon
                .width=${'1rem'}
                .height=${'1rem'}
                .color=${'#fff'}
                .padding=${'0.25rem'}
              >
              </edit-icon>
              ${getLocalizedData('edit')}
            </button>
            <div
              @click=${() => {
                window.dispatchEvent(
                  new CustomEvent('show-popup', {
                    detail: {
                      data: {
                        message: getLocalizedData('delete_message').replace(
                          '#{firstName} #{lastName}',
                          `${el.firstName} ${el.lastName}`
                        ),
                        action: () => {
                          removeEmployee(el.uid);
                        },
                      },
                    },
                  })
                );
              }}
              class="grid-item-trash-button"
            >
              <trash-icon
                .width=${'1rem'}
                .height=${'1rem'}
                .color=${'#fff'}
                .padding=${'0.25rem'}
              >
              </trash-icon>
              ${getLocalizedData('delete')}
            </div>
          </div>
        </div>`
      )}
    </div>`;
  }
}

customElements.define('list-grid', ListGrid);
