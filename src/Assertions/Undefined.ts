import { AssertionError } from "assert";

export default function Undefined(value: any, message?: string) {
    if(value === undefined) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be undefined, but expression is not undefined',
        expected: undefined,
        actual: value
    });
}