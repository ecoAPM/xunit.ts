import { AssertionError } from "assert";

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