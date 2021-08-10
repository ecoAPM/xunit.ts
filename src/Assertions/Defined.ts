import { AssertionError } from "assert";

/**
 * Asserts that a value is defined (any value other than `undefined`)
 * 
 * @remarks
 * Passes if `expression` does not evaluate to `undefined`
 * 
 * Fails if `expression` evaluates to `undefined`
 *
 * @param expression the value to check
 * @param message (optional) message to display on failure
 * 
 * @example
 * this.assert.defined(expression);
 */
export default function Defined(expression: any, message?: string) {
    if(expression !== undefined) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be defined, but expression is undefined',
        expected: '(not undefined expression)',
        actual: expression
    });
}