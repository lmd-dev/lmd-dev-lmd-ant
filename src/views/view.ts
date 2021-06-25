import { Observer } from "../pattern/observer";

/**
 * Represents a generic view
 */
export abstract class View implements Observer
{
    /**
     * Set the value of a number field
     * @param selector CSS selector of the field
     * @param value Value to display
     * @param decimalPlaces Number of decimal places
     */
     protected setNumberField(selector: string, value: number, decimalPlaces: number = 0)
     {
         const field = document.querySelector(selector) as HTMLInputElement;
         if(field)
         field.value = value.toFixed(decimalPlaces);
     }

     /**
      * Notify function of the view
      */
     abstract notify(): void;
}