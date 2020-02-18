declare global {
  interface Window {
    EventBus: EventBus
  }
}

type EventName = string;
type CallbackId = string;
type Callback = Function;

class EventBus {
  private static instance: EventBus;
  private static idCounter = 0;
  private subscriptions!: Record<EventName, Record<CallbackId, Callback>>;

  private constructor() {
    this.subscriptions = {};
  }

  public static get Instance() {
    return window.EventBus || (window.EventBus = new this());
  }

  subscribe(event: EventName, callback: Callback) {
    const id = `event-${EventBus.idCounter++}` as CallbackId;

    if (!this.subscriptions[event]) {
      this.subscriptions[event] = {};
    }

    this.subscriptions[event][id] = callback;

    return {
      unsubscribe: () => {
        delete this.subscriptions[event][id];
        if (Object.getOwnPropertyNames(this.subscriptions[event]).length === 0) {
          delete this.subscriptions[event];
        }
      },
    };
  }

  publish(event: EventName, data: any) {
    if (!this.subscriptions[event]) return;

    Object.getOwnPropertyNames(this.subscriptions[event])
      .forEach(key => this.subscriptions[event][key](data));
  }
}

export type Subscription = ReturnType<EventBus['subscribe']>;
export default EventBus.Instance;