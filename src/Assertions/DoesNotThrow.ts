import { AssertionError } from "assert";

/**
 * Asserts that an expression does not throw an error/exception
 * 
 * @remarks
 * 
 * Passes if calling `expression` does not throw an error/exception
 * 
 * Fails if calling `expression` throws an error/exception
 *
 * @param expression the expression to run
 * @param message (optional) message to display on failure
 */
export default function DoesNotThrow(expression: () => any, message?: string) {
    try {
        expression();
        return;
    } catch (exception) {
        throw new AssertionError({
            message: message || 'Expected expression to not throw exception, but expression did throw exception',
            expected: '(no exception)',
            actual: exception
        });
    }
}