import {NavBar} from '../../src/components/nav-bar/index.js';
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('nav-bar', () => {
  test('is defined', () => {
    const el = document.createElement('nav-bar');
    assert.instanceOf(el, NavBar);
  });

  test('renders navigation structure', async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    await el.updateComplete;

    const navParent = el.shadowRoot.querySelector('.nav-bar-parent');
    assert.exists(navParent);

    const brandParent = el.shadowRoot.querySelector('.brand-parent');
    assert.exists(brandParent);

    const navButtonsParent = el.shadowRoot.querySelector('.nav-buttons-parent');
    assert.exists(navButtonsParent);
  });

  test('renders navigation links', async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    await el.updateComplete;

    const navLinks = el.shadowRoot.querySelectorAll('.nav-buttons-parent > a');
    assert.equal(navLinks.length, 2);

    const employeesLink = navLinks[0];
    const addEmployeeLink = navLinks[1];

    assert.equal(employeesLink.href, window.location.origin + '/');
    assert.equal(
      addEmployeeLink.href,
      window.location.origin + '/add-employee'
    );
  });

  test('renders language buttons', async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    await el.updateComplete;

    const languageButtons = el.shadowRoot.querySelectorAll(
      '.local-buttons-parent a'
    );
    assert.equal(languageButtons.length, 2);

    const trButton = languageButtons[0];
    const enButton = languageButtons[1];

    assert.equal(trButton.textContent, 'TR');
    assert.equal(enButton.textContent, 'EN');
  });

  test('sets current path from window location', async () => {
    const el = await fixture(html`<nav-bar></nav-bar>`);
    await el.updateComplete;

    assert.equal(el.currentPath, window.location.pathname);
  });

  test('applies active class to current path', async () => {
    const el = await fixture(html`<nav-bar .currentPath=${'/'}></nav-bar>`);
    await el.updateComplete;

    const employeesLink = el.shadowRoot.querySelector('a[href="/"]');
    const addEmployeeLink = el.shadowRoot.querySelector(
      'a[href="/add-employee"]'
    );

    assert.isTrue(employeesLink.classList.contains('active'));
    assert.isTrue(addEmployeeLink.classList.contains('inactive'));
  });
});
