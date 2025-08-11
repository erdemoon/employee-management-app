import {Pagination} from '../../src/components/pagination/index.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('pagination', () => {
  test('is defined', () => {
    const el = document.createElement('lit-pagination');
    assert.instanceOf(el, Pagination);
  });

  test('renders with basic properties', async () => {
    const el = await fixture(html`
      <lit-pagination .currentPage=${2} .totalPages=${5}></lit-pagination>
    `);
    await el.updateComplete;

    assert.equal(el.currentPage, 2);
    assert.equal(el.totalPages, 5);

    const pageButtons = el.shadowRoot.querySelectorAll(
      '.pagination-page-button'
    );
    assert.equal(pageButtons.length, 5);
  });

  test('shows active page correctly', async () => {
    const el = await fixture(html`
      <lit-pagination .currentPage=${3} .totalPages=${5}></lit-pagination>
    `);
    await el.updateComplete;

    const activeButton = el.shadowRoot.querySelector(
      '.pagination-page-button.active'
    );
    assert.exists(activeButton);
    assert.equal(activeButton.textContent.trim(), '3');
  });

  test('getPaginationRange returns correct pages', async () => {
    const el = await fixture(html`<lit-pagination></lit-pagination>`);

    const result = el.getPaginationRange(1, 5);
    assert.deepEqual(result, [1, 2, 3, 4, 5]);
  });

  test('next page handler works', async () => {
    let calledPage = null;
    const onPageChange = (page) => {
      calledPage = page;
    };

    const el = await fixture(html`
      <lit-pagination
        .currentPage=${2}
        .totalPages=${5}
        .onPageChange=${onPageChange}
      ></lit-pagination>
    `);

    el.handleNextPageClick();
    assert.equal(calledPage, 3);
  });

  test('previous page handler works', async () => {
    let calledPage = null;
    const onPageChange = (page) => {
      calledPage = page;
    };

    const el = await fixture(html`
      <lit-pagination
        .currentPage=${3}
        .totalPages=${5}
        .onPageChange=${onPageChange}
      ></lit-pagination>
    `);

    el.handlePreviousPageClick();
    assert.equal(calledPage, 2);
  });

  test('clicking page button calls onPageChange', async () => {
    let calledPage = null;
    const onPageChange = (page) => {
      calledPage = page;
    };

    const el = await fixture(html`
      <lit-pagination
        .currentPage=${1}
        .totalPages=${5}
        .onPageChange=${onPageChange}
      ></lit-pagination>
    `);
    await el.updateComplete;

    const pageButtons = el.shadowRoot.querySelectorAll(
      '.pagination-page-button'
    );
    pageButtons[2].click();

    assert.equal(calledPage, 3);
  });
});
