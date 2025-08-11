import {LitElement, html, css} from 'lit';
import {connect} from '../../store/connect';
import '../../components/employee-form';
import '../../layout';
import {getLocalizedData} from '../../service/localization';

export class PageAddEmployee extends connect(LitElement) {
  static styles = css`
    .page-title {
      font-size: 1.75rem;
      color: #ff6200;
      text-decoration: none;
    }
  `;

  render() {
    return html`
      <page-layout>
        <h1 class="page-title">${getLocalizedData('add_employee')}</h1>
        <employee-form></employee-form>
      </page-layout>
    `;
  }
}
customElements.define('page-add-employee', PageAddEmployee);
