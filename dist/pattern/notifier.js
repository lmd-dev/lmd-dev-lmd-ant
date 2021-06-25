/**
 * Notifier class from the Notifier/Observer pattern
 */
export class Notifier {
    /**
     * Constructor
     */
    constructor() {
        this._observers = [];
    }
    /**
     * Adds an observer to the notifier
     * @param observer
     */
    addObserver(observer) {
        this._observers.push(observer);
    }
    /**
     * Notifies each observer of the notifier
     * @param info Facultative string data to send to observers
     */
    notify(info = "") {
        this._observers.forEach((observer) => { observer.notify(info); });
    }
}
