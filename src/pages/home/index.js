import {LitElement, html, css} from 'lit';
import {connect} from '../../store/connect';
import '../../layout';
import '../../components/list-table';
import '../../components/list-grid';
import '../../components/pagination';
import '../../assets/svg/list';
import '../../assets/svg/grid';
import {getLocalizedData} from '../../service/localization';
import {removeEmployee} from '../../store/actions';

export class PageHome extends connect(LitElement) {
  static properties = {
    view: {type: Object},
    chunkData: {type: Array},
    currentData: {type: Array},
    selectedUids: {type: Array},
    searchTerm: {type: String},
  };

  constructor() {
    super();
    this.view = {
      mode: 'list',
      page: 0,
      sub: 10,
    };
    this.selectedUids = [];
    this.searchTerm = '';
  }

  static styles = css`
    .page-header-parent {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .page-header {
      display: flex;
      align-items: center;
    }

    .view-toggle-parent {
      display: flex;
    }

    .page-title {
      font-size: 1.75rem;
      color: #ff6200;
      text-decoration: none;
    }

    .bulk-action-parent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ff6200;
      border-radius: 0.25rem;
      color: #fff;
      padding: 0.25rem 0.5rem;
      margin: 0rem 1rem;
      width: 12rem;
      cursor: pointer;
    }
  `;

  filterEmployees(employees) {
    if (!this.searchTerm) return employees;
    const term = this.searchTerm.toLowerCase();
    return employees.filter((emp) =>
      Object.values(emp).join(' ').toLowerCase().includes(term)
    );
  }

  handleSelectionChanged(e) {
    this.selectedUids = e.detail.selectedUids;
  }

  handleBulkDelete() {
    window.dispatchEvent(
      new CustomEvent('show-popup', {
        detail: {
          data: {
            message: getLocalizedData('bulk_delete_message'),
            action: () => {
              this.selectedUids.forEach((uid) => removeEmployee(uid));
              this.selectedUids = [];
            },
          },
        },
      })
    );
  }

  updated(changedProps) {
    if (changedProps.has('currentData')) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }

    //* TODO: This triggers a warning in the console about state update, find a solution.
    if (
      changedProps.has('currentData') &&
      !this.currentData &&
      this.chunkArray.length > 0
    ) {
      this.view.page = this.view.page - 1;
      this.currentData = this.chunkData[this.view.page];
    }
  }

  chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }

  render() {
    const filteredEmployees = this.filterEmployees(this.state.employees);
    this.chunkData = this.chunkArray(filteredEmployees, this.view.sub);
    this.currentData = this.chunkData[this.view.page];

    return html`
      <page-layout>
        <div class="page-header-parent">
          <div class="page-header">
            <h1 class="page-title">${getLocalizedData('employee_list')}</h1>
            <input
              type="text"
              placeholder=${getLocalizedData('search')}
              .value=${this.searchTerm}
              @input=${(e) => {
                this.searchTerm = e.target.value;
                this.view.page = 0;
              }}
              style="margin-left:1rem; padding:0.5rem; font-size:1rem;"
            />
          </div>
          <div class="view-toggle-parent">
            ${this.selectedUids.length > 0
              ? html`
                  <div
                    class="bulk-action-parent"
                    @click=${this.handleBulkDelete}
                  >
                    <span
                      >${getLocalizedData('bulk_delete_label').replace(
                        '#{count}',
                        this.selectedUids.length
                      )}</span
                    >
                    <div>
                      <trash-icon
                        .width=${'1.25rem'}
                        .height=${'1.25rem'}
                        .color=${'#fff'}
                        .padding=${'0.25rem'}
                      >
                      </trash-icon>
                    </div>
                  </div>
                `
              : ''}
            <div
              @click=${() => {
                if (this.view.mode !== 'list') {
                  this.view = {
                    mode: 'list',
                    page: 0,
                    sub: 10,
                  };
                  this.chunkData = this.chunkArray(
                    this.state.employees,
                    this.view.sub
                  );
                  this.currentData = this.chunkData[this.view.page];
                }
              }}
              style="cursor: pointer;"
            >
              <list-icon
                .width=${'2rem'}
                .height=${'2rem'}
                .color=${this.view.mode === 'list' ? '#ff6200' : '#ff924f'}
                .padding=${'0rem 0.25rem'}
              >
              </list-icon>
            </div>
            <div
              @click=${() => {
                if (this.view.mode !== 'grid') {
                  this.view = {
                    mode: 'grid',
                    page: 0,
                    sub: 4,
                  };
                  this.chunkData = this.chunkArray(
                    this.state.employees,
                    this.view.sub
                  );
                  this.currentData = this.chunkData[this.view.page];
                }
              }}
              style="cursor: pointer;"
            >
              <grid-icon
                .width=${'2rem'}
                .height=${'2rem'}
                .color=${this.view.mode === 'grid' ? '#ff6200' : '#ff924f'}
                .padding=${'0rem 0.25rem'}
              ></grid-icon>
            </div>
          </div>
        </div>
        ${this.currentData && this.currentData.length > 0
          ? html` <div>
              ${this.view.mode === 'list'
                ? html`<list-table
                    .data=${this.currentData}
                    .selectedUids=${this.selectedUids}
                    @selection-changed=${this.handleSelectionChanged}
                  ></list-table>`
                : html`<list-grid .data=${this.currentData}></list-grid>`}
              <lit-pagination
                .totalPages=${this.chunkData.length}
                .currentPage=${this.view.page + 1}
                .onPageChange=${(pageNumber) => {
                  console.log('pageNumber', pageNumber);
                  this.view.page = pageNumber - 1;
                  this.currentData = this.chunkData[this.view.page];
                }}
              ></lit-pagination>
            </div>`
          : ''}
      </page-layout>
    `;
  }
}
customElements.define('page-home', PageHome);
