import { AssertionError } from "assert";

/**
 * Asserts that an array is not empty
 * 
 * @remarks
 * Passes if `array` contains any elements
 * 
 * Fails if `array` contains zero elements
 *
 * @param array the array to check
 * @param message (optional) message to display on failure
 * 
 * @example
 * this.assert.notEmpty(array);
 */
export default function NotEmpty(array: ReadonlyArray<any>, message?: string) {
    if(array.length > 0) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be not empty, but expression was empty',
        expected: '(non-empty expression)',
        actual: array
    })
}