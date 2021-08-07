import { AssertionError } from "assert";

export default function Empty(value: any, message?: string) {
    if(value.length === 0)
        return;

    throw new AssertionError({
        message: message || 'Expected expression to be empty, but expression was not empty',
        expected: [],
        actual: value
    })
}