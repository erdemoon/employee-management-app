import {LitElement, html, css} from 'lit';
import {removeEmployee} from '../../store/actions';
import {Router} from '@vaadin/router';
import '../../assets/svg/trash';
import '../../assets/svg/edit';
import {getLocalizedData} from '../../service/localization';

export class ListTable extends LitElement {
  static properties = {
    data: {type: Array},
    selectedUids: {type: Array},
  };

  constructor() {
    super();
    this.data = [];
    this.selectedUids = [];
  }

  static styles = css`
    .list-table-parent {
      overflow: scroll;
    }

    table {
      width: 100%;
      background-color: #fff;
      border-collapse: collapse;
      font-size: 1rem;
    }
    td,
    th {
      padding: 1.5rem 0.5rem;
      border-bottom: 0.2rem solid #f8f8f8;
      font-weight: normal;
    }

    .list-table-actions-parent {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: nowrap; /* prevent icons from stacking */
      white-space: nowrap; /* prevent line breaks */
    }

    .table-label-row {
      color: #ff6200;
    }
  `;

  updated(changedProps) {
    if (changedProps.has('data')) {
      const validUids = this.data.map((el) => el.uid);
      this.selectedUids = this.selectedUids.filter((uid) =>
        validUids.includes(uid)
      );
    }
  }

  handleSelectAll(e) {
    if (e.target.checked) {
      this.selectedUids = this.data.map((el) => el.uid);
    } else {
      this.selectedUids = [];
    }
    this.dispatchEvent(
      new CustomEvent('selection-changed', {
        detail: {selectedUids: this.selectedUids},
        bubbles: true,
        composed: true,
      })
    );
  }

  handleSelect(e, uid) {
    if (e.target.checked) {
      this.selectedUids = [...this.selectedUids, uid];
    } else {
      this.selectedUids = this.selectedUids.filter((id) => id !== uid);
    }
    this.dispatchEvent(
      new CustomEvent('selection-changed', {
        detail: {selectedUids: this.selectedUids},
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html` <div class="list-table-parent">
      <table>
        <tr class="table-label-row">
          <th>
            <input
              type="checkbox"
              name="selectAll"
              .checked=${this.selectedUids.length === this.data.length &&
              this.data.length > 0}
              @change=${this.handleSelectAll}
            />
          </th>
          <th>${getLocalizedData('first_name')}</th>
          <th>${getLocalizedData('last_name')}</th>
          <th>${getLocalizedData('date_of_employment')}</th>
          <th>${getLocalizedData('date_of_birth')}</th>
          <th>${getLocalizedData('phone')}</th>
          <th>${getLocalizedData('email')}</th>
          <th>${getLocalizedData('department')}</th>
          <th>${getLocalizedData('position')}</th>
          <th>${getLocalizedData('actions')}</th>
        </tr>

        ${this.data?.map(
          (el) => html` <tr>
            <th>
              <input
                type="checkbox"
                name="select"
                .checked=${this.selectedUids.includes(el.uid)}
                @change=${(e) => this.handleSelect(e, el.uid)}
              />
            </th>
            <th>${el.firstName}</th>
            <th>${el.lastName}</th>
            <th>${el.dateOfEmployment}</th>
            <th>${el.dateOfBirth}</th>
            <th>${el.phone}</th>
            <th>${el.email}</th>
            <th>${el.department}</th>
            <th>${el.position}</th>
            <th>
              <div class="list-table-actions-parent">
                <div
                  @click=${() => {
                    Router.go(`/edit-employee-${el.uid}`);
                  }}
                  style="cursor: pointer;"
                >
                  <edit-icon
                    .width=${'1.25rem'}
                    .height=${'1.25rem'}
                    .color=${'#ff6200'}
                    .padding=${'0.25rem'}
                  >
                  </edit-icon>
                </div>
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
                  style="cursor: pointer;"
                >
                  <trash-icon
                    .width=${'1.25rem'}
                    .height=${'1.25rem'}
                    .color=${'#ff6200'}
                    .padding=${'0.25rem'}
                  >
                  </trash-icon>
                </div>
              </div>
            </th>
          </tr>`
        )}
      </table>
    </div>`;
  }
}

customElements.define('list-table', ListTable);
