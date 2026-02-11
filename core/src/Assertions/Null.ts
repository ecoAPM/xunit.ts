import { AssertionError } from "node:assert";

/**
 * Asserts that a value is `null`
 *
 * @remarks
 * Passes if `expression` evaluates to `null`
 *
 * Fails if `expression` does not evaluate to `null`
 *
 * @param expression the value to check
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.null(expression);
 */
export default function Null(expression: any, message?: string) {
	if (expression === null) {
		return;
	}

	throw new AssertionError({
		message: message ?? "Expected expression to be null, but expression is not null",
		expected: null,
		actual: expression
	});
}