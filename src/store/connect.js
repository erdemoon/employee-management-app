import {store} from './store.js';

export const connect = (BaseElement) =>
  class extends BaseElement {
    connectedCallback() {
      super.connectedCallback();
      this._unsubscribe = store.subscribe(() => this.requestUpdate());
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      if (this._unsubscribe) this._unsubscribe();
    }

    get state() {
      return store.getState();
    }
  };
