import {ListTable} from '../../src/components/list-table/index.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('list-table', () => {
  test('is defined', () => {
    const el = document.createElement('list-table');
    assert.instanceOf(el, ListTable);
  });

  test('renders with empty data', async () => {
    const el = await fixture(html`<list-table></list-table>`);
    await el.updateComplete;

    assert.deepEqual(el.data, []);

    const table = el.shadowRoot.querySelector('table');
    assert.exists(table);

    const dataRows = el.shadowRoot.querySelectorAll('tr:not(.table-label-row)');
    assert.equal(dataRows.length, 0);
  });

  test('renders table headers', async () => {
    const el = await fixture(html`<list-table></list-table>`);
    await el.updateComplete;

    const headerRow = el.shadowRoot.querySelector('.table-label-row');
    assert.exists(headerRow);

    const headers = headerRow.querySelectorAll('th');
    assert.isTrue(headers.length > 0);
  });

  test('renders with employee data', async () => {
    const testData = [
      {
        uid: '123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2023',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Developer',
      },
    ];

    const el = await fixture(html`<list-table .data=${testData}></list-table>`);
    await el.updateComplete;

    assert.equal(el.data.length, 1);

    const dataRows = el.shadowRoot.querySelectorAll('tr:not(.table-label-row)');
    assert.equal(dataRows.length, 1);
  });

  test('displays employee information in table cells', async () => {
    const testData = [
      {
        uid: '123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2023',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Developer',
      },
    ];

    const el = await fixture(html`<list-table .data=${testData}></list-table>`);
    await el.updateComplete;

    const cells = el.shadowRoot.querySelectorAll('tr:not(.table-label-row) th');
    const cellTexts = Array.from(cells).map((cell) => cell.textContent.trim());

    assert.include(cellTexts, 'John');
    assert.include(cellTexts, 'Doe');
    assert.include(cellTexts, 'john@example.com');
    assert.include(cellTexts, 'Tech');
  });

  test('has checkboxes for selection', async () => {
    const testData = [
      {
        uid: '123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2023',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Developer',
      },
    ];

    const el = await fixture(html`<list-table .data=${testData}></list-table>`);
    await el.updateComplete;

    const selectAllCheckbox = el.shadowRoot.querySelector(
      'input[name="selectAll"]'
    );
    const rowCheckboxes = el.shadowRoot.querySelectorAll(
      'input[name="select"]'
    );

    assert.exists(selectAllCheckbox);
    assert.equal(rowCheckboxes.length, 1);
  });

  test('handles select all functionality', async () => {
    const testData = [
      {
        uid: '123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2023',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Developer',
      },
    ];

    const el = await fixture(
      html`<list-table .data=${testData} .selectedUids=${[]}></list-table>`
    );
    await el.updateComplete;

    const selectAllCheckbox = el.shadowRoot.querySelector(
      'input[name="selectAll"]'
    );

    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));

    assert.deepEqual(el.selectedUids, ['123']);
  });

  test('has edit and delete action buttons', async () => {
    const testData = [
      {
        uid: '123',
        firstName: 'John',
        lastName: 'Doe',
        dateOfEmployment: '01/01/2023',
        dateOfBirth: '01/01/1990',
        phone: '123-456-7890',
        email: 'john@example.com',
        department: 'Tech',
        position: 'Developer',
      },
    ];

    const el = await fixture(html`<list-table .data=${testData}></list-table>`);
    await el.updateComplete;

    const editIcon = el.shadowRoot.querySelector('edit-icon');
    const trashIcon = el.shadowRoot.querySelector('trash-icon');

    assert.exists(editIcon);
    assert.exists(trashIcon);
  });
});
