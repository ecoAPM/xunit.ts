import { AssertionError } from "assert";

/**
 * Asserts that an array does not contain a given element
 * 
 * @remarks
 * Passes if array `haystack` does not contain an element with a value of `needle`
 * 
 * Fails if array `haystack` contains an element with a value of `needle`
 *
 * @param needle the element to find
 * @param haystack the array to search
 * @param message (optional) message to display on failure
 * 
 * @example
 * this.assert.doesNotContain(needle, haystack);
 */
export default function DoesNotContain<T>(needle: T, haystack: ReadonlyArray<T>, message?: string) {
    if(!haystack.includes(needle)) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected array not containing expression, but array contained expression',
        expected: needle,
        actual: haystack
    });
}