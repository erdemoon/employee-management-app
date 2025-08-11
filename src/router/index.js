import {html, LitElement} from 'lit';
import {Router} from '@vaadin/router';
import '../components/nav-bar';

import '../pages/home';
import '../pages/add-employee';
import '../pages/edit-employee';

export class AppRouter extends LitElement {
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    const router = new Router(this);

    router.setRoutes([
      {path: '/', component: 'page-home'},
      {path: '/add-employee', component: 'page-add-employee'},
      {path: '/edit-employee-:employeeId', component: 'page-edit-employee'},
    ]);
  }

  render() {
    return html`<nav-bar></nav-bar>`;
  }
}

customElements.define('app-router', AppRouter);
