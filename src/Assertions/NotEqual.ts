import { AssertionError } from "assert";
import equal from 'lodash.isequal';

/**
 * Asserts that two values are not equal
 * 
 * @remarks
 * Passes if `actual` and `expected` do not evaluate to equal values
 * 
 * Fails if `actual` and `expected` evaluate to equal values
 * 
 * @param expected the expected value
 * @param actual the actual value
 * @param message (optional) message to display on failure
 *
 * @example
 * this.assert.notEqual(expected, actual);
 */
export default function NotEqual(expected: any, actual: any, message?: string) {
    if(!equal(actual, expected)) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expressions to be not equal, but expressions are equal',
        expected: expected,
        actual: actual,
    });
}