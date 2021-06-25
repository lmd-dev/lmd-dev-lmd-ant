/**
 * Represents a generic view
 */
export class View {
    /**
     * Set the value of a number field
     * @param selector CSS selector of the field
     * @param value Value to display
     * @param decimalPlaces Number of decimal places
     */
    setNumberField(selector, value, decimalPlaces = 0) {
        const field = document.querySelector(selector);
        if (field)
            field.value = value.toFixed(decimalPlaces);
    }
}
