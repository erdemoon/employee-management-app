import {LitElement, html, css} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {addEmployee, doesEmailExist, updateEmployee} from '../../store/actions';
import {Router} from '@vaadin/router';
import {getEmployeeById, doesPhoneExist} from '../../store/actions';
import {getLocalizedData} from '../../service/localization';
import {connect} from '../../store/connect';

export class EmployeeForm extends connect(LitElement) {
  formRef = createRef();
  dateBirthRef = createRef();
  dateEmploymentRef = createRef();

  static properties = {
    employee: {type: Object},
  };

  static styles = css`
    form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    }

    .form-parent {
      background-color: #fff;
      padding: 1rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    .form-input-parent {
      margin: 1rem;
    }

    .form-button-parent {
      margin: 1rem 0rem;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    .form-button-cancel {
      color: #525099;
      background-color: transparent;
      border: 0.1rem solid #525099;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      width: 12.5rem;
      cursor: pointer;
    }

    .form-button-save {
      color: #fff;
      background-color: #ff6200;
      border: 0.1rem solid #ff6200;
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      width: 12.5rem;
      cursor: pointer;
    }

    label {
      display: contents;
    }
    input,
    select {
      width: 100%;
      box-sizing: border-box;
      padding: 4px 6px;
    }
    button {
      padding: 6px 12px;
    }
    .phone-wrapper {
      display: flex;
    }
    .phone-prefix {
      background: #eee;
      padding: 4px 8px;
      border: 1px solid #ccc;
      border-right: none;
      user-select: none;
      display: flex;
      align-items: center;
      white-space: nowrap;
    }
    .phone-input {
      flex: 1;
      border: 1px solid #ccc;
      border-left: none;
      padding: 4px 6px;
    }
  `;

  firstUpdated() {
    const today = new Date().toISOString().split('T')[0];
    this.dateBirthRef.value.max = today;
    this.dateEmploymentRef.value.max = today;

    if (this.employeeId) {
      const employee = getEmployeeById(this.employeeId);
      if (employee) {
        this.formRef.value.firstName.value = employee.firstName;
        this.formRef.value.lastName.value = employee.lastName;
        this.formRef.value.dateOfEmployment.value = this.convertToInputDate(
          employee.dateOfEmployment
        );
        this.formRef.value.dateOfBirth.value = this.convertToInputDate(
          employee.dateOfBirth
        );
        this.formRef.value.phone.value = employee.phone.replace('+(90)', '');
        this.formRef.value.email.value = employee.email;
        this.formRef.value.department.value = employee.department;
        this.formRef.value.position.value = employee.position;
      }
    }
  }

  convertToInputDate(dateStr) {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const phoneInput = form.querySelector('input[name="phone"]');
    const emailInput = form.querySelector('input[name="email"]');

    if (!/^\d{10}$/.test(phoneInput.value)) {
      phoneInput.setCustomValidity('Phone number must be exactly 10 digits!');
    } else if (doesPhoneExist('+(90)' + phoneInput.value, this.employeeId)) {
      phoneInput.setCustomValidity('Please enter a unique phone number!');
    } else {
      phoneInput.setCustomValidity('');
    }

    if (doesEmailExist(emailInput.value, this.employeeId))
      emailInput.setCustomValidity('Please enter a unique email address!');

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    data.phone = '+(90)' + data.phone;

    data.dateOfEmployment = this.formatDate(data.dateOfEmployment);
    data.dateOfBirth = this.formatDate(data.dateOfBirth);
    if (this.employeeId) {
      window.dispatchEvent(
        new CustomEvent('show-popup', {
          detail: {
            data: {
              message: getLocalizedData('edited_save_message').replace(
                '#{firstName} #{lastName}',
                `${data.firstName} ${data.lastName}`
              ),
              action: () => {
                updateEmployee(this.employeeId, data);
                Router.go('/');
              },
            },
          },
        })
      );
    } else {
      addEmployee(data);
      Router.go('/');
    }
  }

  render() {
    return html`
      <div class="form-parent">
        <form @submit=${this.onSubmit} ${ref(this.formRef)}>
          <div class="form-input-parent">
            <label>${getLocalizedData('first_name')}</label>
            <input name="firstName" type="text" required />
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('last_name')}</label>
            <input name="lastName" type="text" required />
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('date_of_employment')}</label>
            <input
              name="dateOfEmployment"
              type="date"
              required
              data-date-format="DD/MM/YYYY"
              ${ref(this.dateEmploymentRef)}
            />
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('date_of_birth')}</label>
            <input
              name="dateOfBirth"
              type="date"
              required
              data-date-format="DD/MM/YYYY"
              ${ref(this.dateBirthRef)}
            />
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('phone')}</label>
            <label class="phone-wrapper">
              <span class="phone-prefix">+(90) </span>
              <input
                name="phone"
                class="phone-input"
                type="tel"
                pattern="\\d{10}"
                required
                minlength="10"
                maxlength="10"
                inputmode="numeric"
                title="Enter 10 digits phone number without +(90)"
                @input=${(e) => e.target.setCustomValidity('')}
              />
            </label>
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('email')}</label>
            <input
              name="email"
              type="email"
              required
              @input=${(e) => e.target.setCustomValidity('')}
            />
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('department')}</label>
            <select name="department" required>
              <option value="" disabled selected>Please Select</option>
              <option value="Analytics">Analytics</option>
              <option value="Tech">Tech</option>
            </select>
          </div>
          <div class="form-input-parent">
            <label>${getLocalizedData('position')}</label>
            <select name="position" required>
              <option value="" disabled selected>Please Select</option>
              <option value="Junior">Junior</option>
              <option value="Medior">Medior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </form>
        <div class="form-button-parent">
          <button
            @click=${() => {
              this.formRef.value.requestSubmit();
            }}
            class="form-button-save"
          >
            ${getLocalizedData('save')}
          </button>
          <button
            @click=${() => {
              Router.go('/');
            }}
            class="form-button-cancel"
          >
            ${getLocalizedData('cancel')}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
