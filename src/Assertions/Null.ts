import { AssertionError } from "assert";

export default function Null(value: any, message?: string) {
    if(value === null)
    return;

    throw new AssertionError({
        message: message || 'Expected expression to be null, but expression is not null',
        expected: null,
        actual: value
    });
}