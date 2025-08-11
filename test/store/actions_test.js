import {
  setLanguage,
  getLanguage,
  addEmployee,
  updateEmployee,
  removeEmployee,
  getEmployeeById,
  doesEmailExist,
  doesPhoneExist,
} from '../../src/store/actions.js';
import {store} from '../../src/store/store.js';
import {assert} from '@open-wc/testing';

suite('store actions', () => {
  const setupTestState = () => {
    store.dispatch(() => ({
      employees: [
        {
          uid: 'test-123',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@test.com',
          phone: '+(90)1234567890',
          department: 'Tech',
          position: 'Developer',
          dateOfBirth: '01/01/1990',
          dateOfEmployment: '01/01/2023',
        },
      ],
      language: 'en',
    }));
  };

  suite('language actions', () => {
    test('setLanguage updates language in store', () => {
      setupTestState();
      setLanguage('tr');
      assert.equal(store.getState().language, 'tr');
    });

    test('getLanguage returns current language', () => {
      setupTestState();
      setLanguage('fr');
      const language = getLanguage();
      assert.equal(language, 'fr');
    });
  });

  suite('employee CRUD actions', () => {
    test('addEmployee adds new employee', () => {
      setupTestState();
      const newEmployee = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        phone: '+(90)9876543210',
        department: 'Analytics',
        position: 'Analyst',
        dateOfBirth: '02/02/1992',
        dateOfEmployment: '02/02/2023',
      };

      const initialCount = store.getState().employees.length;
      addEmployee(newEmployee);
      const newState = store.getState();

      assert.equal(newState.employees.length, initialCount + 1);

      const addedEmployee = newState.employees[newState.employees.length - 1];
      assert.equal(addedEmployee.firstName, 'Jane');
      assert.equal(addedEmployee.email, 'jane@test.com');
      assert.exists(addedEmployee.uid);
    });

    test('updateEmployee updates existing employee', () => {
      setupTestState();
      const updates = {
        firstName: 'Johnny',
        department: 'Analytics',
      };

      updateEmployee('test-123', updates);
      const updatedEmployee = store
        .getState()
        .employees.find((emp) => emp.uid === 'test-123');

      assert.equal(updatedEmployee.firstName, 'Johnny');
      assert.equal(updatedEmployee.department, 'Analytics');
      assert.equal(updatedEmployee.lastName, 'Doe');
    });

    test('removeEmployee removes employee from store', () => {
      setupTestState();
      const initialCount = store.getState().employees.length;

      removeEmployee('test-123');
      const newState = store.getState();

      assert.equal(newState.employees.length, initialCount - 1);

      const removedEmployee = newState.employees.find(
        (emp) => emp.uid === 'test-123'
      );
      assert.isUndefined(removedEmployee);
    });

    test('getEmployeeById returns correct employee', () => {
      setupTestState();
      const employee = getEmployeeById('test-123');

      assert.exists(employee);
      assert.equal(employee.uid, 'test-123');
      assert.equal(employee.firstName, 'John');
      assert.equal(employee.email, 'john@test.com');
    });

    test('getEmployeeById returns undefined for non-existent uid', () => {
      setupTestState();
      const employee = getEmployeeById('non-existent');
      assert.isUndefined(employee);
    });
  });

  suite('validation functions', () => {
    test('doesEmailExist returns true for existing email', () => {
      setupTestState();
      const exists = doesEmailExist('john@test.com');
      assert.isTrue(exists);
    });

    test('doesEmailExist returns false for non-existing email', () => {
      setupTestState();
      const exists = doesEmailExist('nonexistent@test.com');
      assert.isFalse(exists);
    });

    test('doesEmailExist excludes current employee when uid provided', () => {
      setupTestState();
      const exists = doesEmailExist('john@test.com', 'test-123');
      assert.isFalse(exists);
    });

    test('doesPhoneExist returns true for existing phone', () => {
      setupTestState();
      const exists = doesPhoneExist('+(90)1234567890');
      assert.isTrue(exists);
    });

    test('doesPhoneExist returns false for non-existing phone', () => {
      setupTestState();
      const exists = doesPhoneExist('+(90)0000000000');
      assert.isFalse(exists);
    });

    test('doesPhoneExist excludes current employee when uid provided', () => {
      setupTestState();
      const exists = doesPhoneExist('+(90)1234567890', 'test-123');
      assert.isFalse(exists);
    });
  });
});
