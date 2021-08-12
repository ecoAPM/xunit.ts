import { AssertionError } from "assert";

/**
 * Asserts that an array contains a given element
 * 
 * @remarks
 * Passes if array `haystack` contains an element with a value of `needle`
 * 
 * Fails if array `haystack` does not contain an element with a value of `needle`
 *
 * @param needle the element to find
 * @param haystack the array to search
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.contains(needle, haystack);
 */
export default function Contains<T>(needle: T, haystack: ReadonlyArray<T>, message?: string) {
    if(haystack.includes(needle)) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected array containing expression, but array did not contain expression',
        expected: needle,
        actual: haystack
    });
}