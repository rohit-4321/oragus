/* eslint-disable no-unused-vars */
export class Subject<T> {
  private _value: T;

  private _observers: ((param: T) => void)[] = [];

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  attach(observerFunc: (value: T) => void, callOnset: boolean = true) {
    this._observers.push(observerFunc);
    if (callOnset) {
      observerFunc(this._value);
    }
  }

  detach(observer: (value: T) => void): void {
    const index = this._observers.indexOf(observer);
    if (index !== -1) {
      this._observers.splice(index, 1);
    }
  }

  private notify() {
    this._observers.forEach((observer) => observer(this._value));
  }

  get value():T {
    return this._value;
  }

  set value(val: T) {
    this._value = val;
    this.notify();
  }
}
