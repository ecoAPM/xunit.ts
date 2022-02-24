import { AssertionError } from "assert";

/**
 * Asserts that a given value is equal to `false`
 *
 * @remarks
 * Passes if `expression` evaluates to `false`
 *
 * Fails if `expression` does not evaluate to `false`
 *
 * @param expression the value to check
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.false(expression);
 */
export default function False(expression: any, message?: string) {
	if (expression === false) {
		return;
	}

	throw new AssertionError({
		message: message || "Expected expression to be false, but expression is not false",
		expected: false,
		actual: expression
	});
}