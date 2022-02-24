import { AssertionError } from "assert";

/**
 * Asserts that a given value is equal to `undefined`
 *
 * @remarks
 * Passes if `expression` evaluates to `undefined`
 *
 * Fails if `expression` does not evaluate to `undefined`
 *
 * @param expression the value to check
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.undefined(expression);
 */
export default function Undefined(expression: any, message?: string) {
	if (expression === undefined) {
		return;
	}

	throw new AssertionError({
		message: message || "Expected expression to be undefined, but expression is not undefined",
		expected: undefined,
		actual: expression
	});
}