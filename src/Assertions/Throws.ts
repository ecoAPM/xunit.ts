import { AssertionError } from "assert";

/**
 * Asserts that an expression throws an error/exception
 * 
 * @remarks
 * 
 * Passes if calling `expression` throws an error/exception
 * 
 * Fails if calling `expression` does not throw an error/exception
 *
 * @param expression the expression to run
 * @param message (optional) message to display on failure
 */
export default function Throws(expression: () => any, message?: string) {
    try {
        expression();
    } catch (exception) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to throw exception, but expression did not throw exception'
    });
}