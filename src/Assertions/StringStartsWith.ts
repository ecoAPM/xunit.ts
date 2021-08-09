import { AssertionError } from "assert";

/**
 * Asserts that a string begins with a given substring
 * 
 * @remarks
 * 
 * Passes if the first characters of `haystack` match `needle`
 * 
 * Fails if the first characters of `haystack` do not match `needle`
 *
 * @param needle the substring to find
 * @param haystack the string to search
 * @param message (optional) message to display on failure
 */
export default function StringStartsWith(needle: string, haystack: string|null, message?: string) {
    if(haystack !== undefined && haystack !== null && haystack.indexOf(needle) === 0) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected string containing expression, but string did not contain expression',
        expected: needle,
        actual: haystack
    });
}