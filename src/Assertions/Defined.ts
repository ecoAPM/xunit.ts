import { AssertionError } from "assert";

export default function Defined(value: any, message?: string) {
    if(value !== undefined)
        return;

    throw new AssertionError({
        message: message || 'Expected expression to be defined, but expression is undefined',
        expected: '(not undefined expression)',
        actual: value
    });
}