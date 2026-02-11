import { AssertionError } from "node:assert";

/**
 * Asserts that a string does not match a given regular expression
 *
 * @remarks
 * Passes if `haystack` does not pass a `regex` test
 *
 * Fails if `haystack` passes a `regex` test
 *
 * @param regex the regular expression to test
 * @param haystack the string to search
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.stringDoesNotMatch(regex, haystack);
 */
export default function StringDoesNotMatch(regex: RegExp, haystack: string | null, message?: string) {
	if (haystack === undefined || haystack === null || !regex.test(haystack)) {
		return;
	}

	throw new AssertionError({
		message: message ?? "Expected string not pass regular expression test, but string did pass",
		expected: regex.test(haystack),
		actual: haystack
	});
}