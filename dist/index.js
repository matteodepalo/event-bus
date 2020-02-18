"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.idCounter = 0;
        this.subscriptions = {};
    }
    Object.defineProperty(EventBus, "Instance", {
        get: function () {
            return window.EventBus || (window.EventBus = new this());
        },
        enumerable: true,
        configurable: true
    });
    EventBus.prototype.subscribe = function (event, callback) {
        var _this = this;
        var id = "event-" + this.idCounter++;
        if (!this.subscriptions[event]) {
            this.subscriptions[event] = {};
        }
        this.subscriptions[event][id] = callback;
        return {
            unsubscribe: function () {
                delete _this.subscriptions[event][id];
                if (Object.getOwnPropertyNames(_this.subscriptions[event]).length === 0) {
                    delete _this.subscriptions[event];
                }
            },
        };
    };
    EventBus.prototype.publish = function (event, data) {
        var _this = this;
        if (!this.subscriptions[event])
            return;
        Object.getOwnPropertyNames(this.subscriptions[event])
            .forEach(function (key) { return _this.subscriptions[event][key](data); });
    };
    return EventBus;
}());
exports.default = EventBus.Instance;
