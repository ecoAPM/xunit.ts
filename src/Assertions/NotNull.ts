import { AssertionError } from "assert";

/**
 * Asserts that a value is not `null`
 * 
 * @remarks
 * 
 * Passes if `expression` does not evaluate to `null`
 * 
 * Fails if `expression` evaluates to `null`
 * 
 * @param expression the value to check
 * @param message (optional) message to display on failure
 */
export default function NotNull(expression: any, message?: string) {
    if(expression !== null) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be not null, but expression is null',
        expected: '(non-null expression)',
        actual: expression
    });
}