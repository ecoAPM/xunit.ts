import { AssertionError } from "assert";

/**
 * Asserts that a string does not end with a given substring
 * 
 * @remarks
 * 
 * Passes if the final characters of `haystack` do not match `needle`
 * 
 * Fails if the final characters of `haystack` match `needle`
 *
 * @param needle the substring to find
 * @param haystack the string to search
 * @param message (optional) message to display on failure
 */
export default function StringNotEndsWith(needle: string, haystack: string|null, message?: string) {
    if(haystack === undefined || haystack === null || haystack.indexOf(needle) !== haystack.length - needle.length) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected string containing expression, but string did not contain expression',
        expected: needle,
        actual: haystack
    });
}