import { AssertionError } from "assert";

/**
 * Asserts that an array contains a certain number of elements
 * 
 * @remarks
 * 
 * Passes if `array` contains `expected` number of elements
 * 
 * Fails if `array` does not contain `expected` number of elements
 *
 * @param expected the number of array elements expected
 * @param array the array to check the length of
 * @param message (optional) message to display on failure
 */
export default function Count(expected: number, array: any[], message?: string) {
    if(array.length === expected) {
        return;
    }

    throw new AssertionError({
        message: message || `Expected array with ${expected} elements, but array had ${array.length} elements`,
        expected: expected,
        actual: array.length
    });
}