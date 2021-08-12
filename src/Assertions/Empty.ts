import { AssertionError } from "assert";

/**
 * Asserts that an array is empty
 * 
 * @remarks
 * Passes if `array` contains zero elements
 * 
 * Fails if `array` contains any elements
 *
 * @param array the array to check
 * @param message (optional) message to display on failure
 * 
 * @example
 * this.assert.empty(array);
 */
export default function Empty(array: ReadonlyArray<any>, message?: string) {
    if(array.length === 0) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be empty, but expression was not empty',
        expected: [],
        actual: array
    })
}