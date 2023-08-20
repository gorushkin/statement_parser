import { makeAutoObservable } from 'mobx';

class BooleanFlag {
  value: boolean;
  constructor(value: boolean) {
    makeAutoObservable(this);
    this.value = value;
  }

  public setTrue = () => (this.value = true);
  public setFalse = () => (this.value = false);
  public toggle = () => (this.value = !this.value);
}

export { BooleanFlag };
