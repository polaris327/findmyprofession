export class MemoryService {
  store: Object;

  constructor() {
    this.store = {};
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  getItem(key) {
    if (this.store[key]) {
      return this.store[key];
    }
    return null;
  }

  removeItem(key) {
    if (this.store[key]) {
      delete this.store[key];
    }
  }
}
