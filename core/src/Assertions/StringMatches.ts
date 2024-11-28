import { AssertionError } from "assert";

/**
 * Asserts that a string matches a given regular expression
 *
 * @remarks
 * Passes if `haystack` matches a `regex` test
 *
 * Fails if `haystack` does not match a `regex` test
 *
 * @param regex the regular expression to match
 * @param haystack the string to search
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.stringMatches(regex, haystack);
 */
export default function StringMatches(regex: RegExp, haystack: string | null, message?: string) {
	if (haystack !== undefined && haystack !== null && regex.test(haystack)) {
		return;
	}

	throw new AssertionError({
		message: message ?? "Expected string to match regular expression, but string did not match",
		expected: regex,
		actual: haystack
	});
}