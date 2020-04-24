import { AssertionError } from "assert";

export default function False(value: any, message?: string) {
    if(value == false)
        return;

    throw new AssertionError({
        message: message || 'Expected expression to be false, but expression is not false',
        expected: false,
        actual: value
    });
}