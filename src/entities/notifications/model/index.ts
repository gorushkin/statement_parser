import { makeAutoObservable } from 'mobx';

export type Status = 'error' | 'info' | 'success' | 'warning';

const DEFAULT_TIMER = 5000;

class Notification {
  #timer: NodeJS.Timeout | null;
  id: string;
  message: string;
  status: Status;
  #onDestroy: (id: string) => void;

  constructor({
    message,
    onDestroy,
    status,
  }: {
    message: string;
    onDestroy: (id: string) => void;
    status: Status;
  }) {
    this.status = status;
    this.message = message;
    this.#timer = null;
    this.id = new Date().getTime().toString(36);
    this.#onDestroy = onDestroy;
    this.#start();
  }

  #start = () => {
    this.#timer = setTimeout(() => this.#onDestroy(this.id), DEFAULT_TIMER);
  };

  destroy = () => {
    if (!this.#timer) return;
    clearTimeout(this.#timer);
    this.#onDestroy(this.id);
  };
}

class NotificationStore {
  notifications: Notification[];

  constructor() {
    makeAutoObservable(this);
    this.notifications = [];
  }

  addNotification = ({
    message,
    status,
  }: {
    message: string;
    status: Status;
  }) => {
    const notification = new Notification({
      message,
      onDestroy: this.removeNotification,
      status,
    });
    this.notifications.push(notification);
  };

  addErrorMessage = (message: string) =>
    this.addNotification({ message, status: 'error' });

  addSuccessMessage = (message: string) =>
    this.addNotification({ message, status: 'success' });

  removeNotification = (id: string) => {
    this.notifications = this.notifications.filter((item) => item.id !== id);
  };
}

export { NotificationStore };
