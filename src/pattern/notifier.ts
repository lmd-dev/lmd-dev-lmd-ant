import { Observer } from "./observer.js";
/**
 * Notifier class from the Notifier/Observer pattern
 */
export class Notifier
{
    //Observers of the notifier
    private _observers: Observer[];

    /**
     * Constructor
     */
    constructor()
    {
        this._observers = [];
    }

    /**
     * Adds an observer to the notifier
     * @param observer 
     */
    addObserver(observer: Observer)
    {
        this._observers.push(observer);
    }

    /**
     * Notifies each observer of the notifier
     * @param info Facultative string data to send to observers
     */
    notify(info: string = "")
    {
        this._observers.forEach((observer) => { observer.notify(info); });
    }
    
}