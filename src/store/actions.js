import {store} from './store.js';

export const setLanguage = (language) => {
  store.dispatch((state) => ({
    ...state,
    language: language,
  }));
};

export const getLanguage = () => {
  return store.getState().language;
};

export const addEmployee = (employee) => {
  const employeeObj = {...employee, uid: crypto.randomUUID()};

  store.dispatch((state) => ({
    ...state,
    employees: [...state.employees, employeeObj],
  }));
};

export const updateEmployee = (uid, employee) => {
  store.dispatch((state) => ({
    ...state,
    employees: state.employees.map((item) =>
      item.uid === uid ? {...item, ...employee} : item
    ),
  }));
};

export const removeEmployee = (uid) => {
  store.dispatch((state) => ({
    ...state,
    employees: state.employees.filter((item) => uid !== item.uid),
  }));
};

export const getEmployeeById = (uid) => {
  return store.getState().employees.find((el) => el.uid === uid);
};

export const doesEmailExist = (email, uid = null) => {
  return store
    .getState()
    .employees.some((el) => el.email === email && el.uid !== uid);
};

export const doesPhoneExist = (phone, uid = null) => {
  return store
    .getState()
    .employees.some((el) => el.phone === phone && el.uid !== uid);
};
