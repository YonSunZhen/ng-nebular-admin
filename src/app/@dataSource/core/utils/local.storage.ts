export class LocalStorage {
  constructor() { }
  static set(key: string, value: string): void {
    localStorage[key] = value;
  }
  static get(key: string): string {
    return localStorage[key] || false;
  }
  static setObject(key: string, value: any): void {
    localStorage[key] = JSON.stringify(value);
  }
  static getObject(key: string): any {
    return JSON.parse(localStorage[key] || '{}');
  }
  static remove(key: string): any {
    localStorage.removeItem(key);
  }
}
