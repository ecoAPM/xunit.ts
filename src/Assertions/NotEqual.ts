import { AssertionError } from "assert";

export default function NotEqual(expected: any, actual: any, message?: string) {
    if(actual !== expected) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expressions to be not equal, but expressions are equal',
        expected: expected,
        actual: actual,
    });
}