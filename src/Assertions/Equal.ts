import { AssertionError } from "assert";

export default function Equal(expected: any, actual: any, message?: string) {
    if(actual == expected)
    return;

    throw new AssertionError({
        message: message || 'Expected expressions to be equal, but expressions are not equal',
        expected: expected,
        actual: actual,
    });
}