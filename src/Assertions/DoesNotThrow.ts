import { AssertionError } from "assert";

export default function DoesNotThrow(expression: () => any, message?: string) {
    try {
        expression();
    } catch (exception) {
        throw new AssertionError({
            message: message || 'Expected expression to not throw exception, but expression did throw exception',
            expected: '(no exception)',
            actual: exception
        });
    }
}