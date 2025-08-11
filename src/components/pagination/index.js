import {LitElement, html, css} from 'lit';
import '../../assets/svg/left';
import '../../assets/svg/right';

export class Pagination extends LitElement {
  static properties = {
    currentPage: {type: Number},
    totalPages: {type: Number},
    onPageChange: {type: Function},
  };

  constructor() {
    super();
  }

  static styles = css`
    .pagination-parent {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
    }

    .pagination-pages-parent {
      margin: 0 0.5rem;
    }

    .pagination-page-button {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }

    .pagination-page-button.active {
      color: white;
      background-color: rgb(255, 98, 0);
    }
  `;

  handleNextPageClick() {
    if (this.onPageChange && this.currentPage < this.totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  handlePreviousPageClick() {
    if (this.onPageChange && this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  getPaginationRange(currentPage, totalPages, maxVisible = 7) {
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (left > 2) pages.push('...');

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  }

  render() {
    const pages = this.getPaginationRange(this.currentPage, this.totalPages);

    return html`
      <div class="pagination-parent">
        <div @click=${this.handlePreviousPageClick} style="cursor: pointer;">
          <left-icon
            .width=${'1.75rem'}
            .height=${'1.75rem'}
            .color=${'#ff6200'}
            .padding=${'0.25rem'}
          ></left-icon>
        </div>
        <div class="pagination-pages-parent">
          ${pages.map((page) =>
            page === '...'
              ? html`<span>...</span>`
              : html`
                  <button
                    class=${'pagination-page-button' +
                    (page === this.currentPage ? ' active' : '')}
                    @click=${() => this.onPageChange?.(page)}
                  >
                    ${page}
                  </button>
                `
          )}
        </div>
        <div @click=${this.handleNextPageClick} style="cursor: pointer;">
          <right-icon
            .width=${'1.75rem'}
            .height=${'1.75rem'}
            .color=${'#ff6200'}
            .padding=${'0.25rem'}
          ></right-icon>
        </div>
      </div>
    `;
  }
}

customElements.define('lit-pagination', Pagination);
