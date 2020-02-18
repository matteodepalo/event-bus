declare global {
    interface Window {
        EventBus: EventBus;
    }
}
declare type EventName = string;
declare type Callback = Function;
declare class EventBus {
    private idCounter;
    private subscriptions;
    private constructor();
    static get Instance(): EventBus;
    subscribe(event: EventName, callback: Callback): {
        unsubscribe: () => void;
    };
    publish(event: EventName, data: any): void;
}
export declare type Subscription = ReturnType<EventBus['subscribe']>;
declare const _default: EventBus;
export default _default;
