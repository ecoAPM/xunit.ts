import { AssertionError } from "assert";

export default function Equal(expected: any, actual: any, message?: string) {
    if(actual == expected
        || (Array.isArray(actual) && Array.isArray(expected) && actual.length == expected.length
            && expected.filter((value: any, index: number) => value == expected[index]).length == expected.length))
        return;

    throw new AssertionError({
        message: message || 'Expected expressions to be equal, but expressions are not equal',
        expected: expected,
        actual: actual,
    });
}