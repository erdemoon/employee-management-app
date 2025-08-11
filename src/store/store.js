import {MockData} from '../mock/data';

class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  dispatch(reducerFn) {
    const newState = reducerFn(this.state);
    if (newState !== this.state) {
      this.state = newState;
      this.listeners.forEach((fn) => fn(this.state));
    }
  }
}

export const store = new Store({
  employees: MockData,
  language: navigator.language === 'en-US' ? 'en' : navigator.language,
});
