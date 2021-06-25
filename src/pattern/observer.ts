/**
 * Representes an observer in the Notifier/Observer pattern
 */
export interface Observer
{
    notify(info: string): void;
}