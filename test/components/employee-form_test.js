import {EmployeeForm} from '../../src/components/employee-form/index.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-form', () => {
  test('is defined', () => {
    const el = document.createElement('employee-form');
    assert.instanceOf(el, EmployeeForm);
  });

  test('renders form structure', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');
    assert.exists(form);

    const formParent = el.shadowRoot.querySelector('.form-parent');
    assert.exists(formParent);
  });

  test('renders all required input fields', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const firstNameInput = el.shadowRoot.querySelector(
      'input[name="firstName"]'
    );
    const lastNameInput = el.shadowRoot.querySelector('input[name="lastName"]');
    const emailInput = el.shadowRoot.querySelector('input[name="email"]');
    const phoneInput = el.shadowRoot.querySelector('input[name="phone"]');

    assert.exists(firstNameInput);
    assert.exists(lastNameInput);
    assert.exists(emailInput);
    assert.exists(phoneInput);
  });

  test('renders date input fields', async function () {
    const isWebkit =
      navigator.userAgent.includes('AppleWebKit') &&
      !navigator.userAgent.includes('Chrome');
    const isWindows = navigator.platform.startsWith('Win');

    if (isWebkit && isWindows) {
      // Skip this test on WebKit browsers on Windows due to date input issues
      // Test passes on MacOS without issues
      this.skip();
    }

    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const dateOfBirthInput = el.shadowRoot.querySelector(
      'input[name="dateOfBirth"]'
    );
    const dateOfEmploymentInput = el.shadowRoot.querySelector(
      'input[name="dateOfEmployment"]'
    );

    assert.exists(dateOfBirthInput);
    assert.exists(dateOfEmploymentInput);
    assert.equal(dateOfBirthInput.type, 'date');
    assert.equal(dateOfEmploymentInput.type, 'date');
  });

  test('renders select dropdowns', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const departmentSelect = el.shadowRoot.querySelector(
      'select[name="department"]'
    );
    const positionSelect = el.shadowRoot.querySelector(
      'select[name="position"]'
    );

    assert.exists(departmentSelect);
    assert.exists(positionSelect);

    const departmentOptions = departmentSelect.querySelectorAll('option');
    const positionOptions = positionSelect.querySelectorAll('option');

    assert.isTrue(departmentOptions.length > 1);
    assert.isTrue(positionOptions.length > 1);
  });

  test('renders save and cancel buttons', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const saveButton = el.shadowRoot.querySelector('.form-button-save');
    const cancelButton = el.shadowRoot.querySelector('.form-button-cancel');

    assert.exists(saveButton);
    assert.exists(cancelButton);
  });

  test('phone input has correct pattern and constraints', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const phoneInput = el.shadowRoot.querySelector('input[name="phone"]');

    assert.equal(phoneInput.type, 'tel');
    assert.equal(phoneInput.pattern, '\\d{10}');
    assert.equal(phoneInput.minLength, 10);
    assert.equal(phoneInput.maxLength, 10);
  });

  test('formatDate method works correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    const result = el.formatDate('2023-12-25');
    assert.equal(result, '25/12/2023');
  });

  test('convertToInputDate method works correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    const result = el.convertToInputDate('25/12/2023');
    assert.equal(result, '2023-12-25');
  });

  test('validates email format correctly', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const emailInput = el.shadowRoot.querySelector('input[name="email"]');

    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    assert.isFalse(emailInput.validity.valid);

    emailInput.value = 'valid@example.com';
    emailInput.dispatchEvent(new Event('input'));
    assert.isTrue(emailInput.validity.valid);
  });

  test('validates phone number constraints', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const phoneInput = el.shadowRoot.querySelector('input[name="phone"]');

    phoneInput.value = '123';
    phoneInput.dispatchEvent(new Event('input'));
    assert.isFalse(phoneInput.validity.valid);

    phoneInput.value = 'abcd567890';
    phoneInput.dispatchEvent(new Event('input'));
    assert.isFalse(phoneInput.validity.valid);

    phoneInput.value = '1234567890';
    phoneInput.dispatchEvent(new Event('input'));
    assert.isTrue(phoneInput.validity.valid);
  });

  test('required fields prevent form submission when empty', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');

    const isValid = form.checkValidity();
    assert.isFalse(isValid);

    const requiredFields = el.shadowRoot.querySelectorAll(
      'input[required], select[required]'
    );
    assert.isTrue(requiredFields.length > 0);
  });

  test('date inputs have proper max date constraints', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    await el.updateComplete;

    const dateOfBirthInput = el.shadowRoot.querySelector(
      'input[name="dateOfBirth"]'
    );
    const dateOfEmploymentInput = el.shadowRoot.querySelector(
      'input[name="dateOfEmployment"]'
    );

    const today = new Date().toISOString().split('T')[0];

    assert.equal(dateOfBirthInput.max, today);
    assert.equal(dateOfEmploymentInput.max, today);
  });
});
