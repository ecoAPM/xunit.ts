import { AssertionError } from "assert";

export default function Count(expected: number, array: any[], message?: string) {
    if(array.length == expected)
        return;

    throw new AssertionError({
        message: message || `Expected array with ${expected} elements, but array had ${array.length} elements`,
        expected: expected,
        actual: array.length
    });
}