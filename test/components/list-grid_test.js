import {ListGrid} from '../../src/components/list-grid/index.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('list-grid', () => {
  test('is defined', () => {
    const el = document.createElement('list-grid');
    assert.instanceOf(el, ListGrid);
  });

  test('renders with empty data', async () => {
    const el = await fixture(html`<list-grid></list-grid>`);
    await el.updateComplete;

    assert.deepEqual(el.data, []);

    const gridParent = el.shadowRoot.querySelector('.grid-parent');
    assert.exists(gridParent);

    const gridItems = el.shadowRoot.querySelectorAll('.grid-item-parent');
    assert.equal(gridItems.length, 0);
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

    const el = await fixture(html`<list-grid .data=${testData}></list-grid>`);
    await el.updateComplete;

    assert.equal(el.data.length, 1);

    const gridItems = el.shadowRoot.querySelectorAll('.grid-item-parent');
    assert.equal(gridItems.length, 1);
  });

  test('displays employee information correctly', async () => {
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

    const el = await fixture(html`<list-grid .data=${testData}></list-grid>`);
    await el.updateComplete;

    const values = el.shadowRoot.querySelectorAll('.grid-item-value');
    const valueTexts = Array.from(values).map((v) => v.textContent);

    assert.include(valueTexts, 'John');
    assert.include(valueTexts, 'Doe');
    assert.include(valueTexts, 'john@example.com');
    assert.include(valueTexts, 'Tech');
  });

  test('renders multiple employees', async () => {
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
      {
        uid: '456',
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfEmployment: '02/02/2023',
        dateOfBirth: '02/02/1992',
        phone: '987-654-3210',
        email: 'jane@example.com',
        department: 'Analytics',
        position: 'Analyst',
      },
    ];

    const el = await fixture(html`<list-grid .data=${testData}></list-grid>`);
    await el.updateComplete;

    const gridItems = el.shadowRoot.querySelectorAll('.grid-item-parent');
    assert.equal(gridItems.length, 2);
  });

  test('has edit and delete buttons for each employee', async () => {
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

    const el = await fixture(html`<list-grid .data=${testData}></list-grid>`);
    await el.updateComplete;

    const editButton = el.shadowRoot.querySelector('.grid-item-edit-button');
    const deleteButton = el.shadowRoot.querySelector('.grid-item-trash-button');

    assert.exists(editButton);
    assert.exists(deleteButton);
  });
});
