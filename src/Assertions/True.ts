import { AssertionError } from "assert";

export default function True(value: any, message?: string) {
    if(value === true) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be true, but expression is not true',
        expected: true,
        actual: value
    });
}