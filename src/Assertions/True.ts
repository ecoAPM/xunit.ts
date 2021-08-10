import { AssertionError } from "assert";

/**
 * Asserts that a given expression evaluates to `true`
 * 
 * @remarks
 * Passes if `expression` evaluates to `true`
 * 
 * Fails if `expression` does not evaluate to `true`
 * 
 * @param expression the value to check
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.true(expression);
 */
export default function True(expression: any, message?: string) {
    if(expression === true) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be true, but expression is not true',
        expected: true,
        actual: expression
    });
}