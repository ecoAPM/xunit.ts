import { AssertionError } from "assert";

/**
 * Asserts that a string does not contain a given substring
 *
 * @remarks
 * Passes if `needle` is not a substring of `haystack`
 *
 * Fails if `needle` is a substring of `haystack`
 *
 * @param needle the substring to find
 * @param haystack the string to search
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.stringDoesNotContain(needle, haystack);
 */
export default function StringDoesNotContain(needle: string, haystack: string | null, message?: string) {
	if (haystack === undefined || haystack === null || haystack.indexOf(needle) === -1) {
		return;
	}

	throw new AssertionError({
		message: message ?? "Expected string not containing expression, but string did contain expression",
		expected: needle,
		actual: haystack
	});
}