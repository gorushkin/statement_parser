import { makeAutoObservable } from 'mobx';

type State = 'ready' | 'waiting';

class ConvertingState {
  state: State = 'waiting';

  private stateMapping: Record<State, State> = {
    ready: 'waiting',
    waiting: 'ready',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setWaiting = () => (this.state = 'waiting');
  setReady = () => (this.state = 'ready');
  toggle = () => (this.state = this.stateMapping[this.state]);
}

export { ConvertingState };
