import {LitElement, html, css} from 'lit';
import {connect} from '../../store/connect';
import '../../components/nav-bar';
import '../../components/employee-form';
import '../../layout';
import {getLocalizedData} from '../../service/localization';

export class PageEditEmployee extends connect(LitElement) {
  static properties = {
    employeeId: {type: String},
  };

  static styles = css`
    .page-title {
      font-size: 1.75rem;
      color: #ff6200;
      text-decoration: none;
    }
  `;

  render() {
    this.employeeId = this.location?.params?.employeeId || '';

    return html`
      <page-layout>
        <h1 class="page-title">${getLocalizedData('edit_employee')}</h1>
        <employee-form .employeeId=${this.employeeId}></employee-form>
      </page-layout>
    `;
  }
}
customElements.define('page-edit-employee', PageEditEmployee);
