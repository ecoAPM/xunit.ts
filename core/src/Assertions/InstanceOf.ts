import { AssertionError } from "assert";

/**
 * Asserts that a value is an instance of a certain type
 *
 * @remarks
 * Passes if `object`'s type matches `type`
 *
 * Fails if `object`'s type does not match `type`
 *
 * @param type the expected type of the value
 * @param expression the value to check
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.instanceOf(type, object);
 */
export default function InstanceOf(type: any, expression: any, message?: string) {
	if (expression instanceof type) {
		return;
	}

	throw new AssertionError({
		message: message ?? `Expected expression of type, but was ${typeof expression}`,
		expected: type.name,
		actual: typeof expression
	});
}