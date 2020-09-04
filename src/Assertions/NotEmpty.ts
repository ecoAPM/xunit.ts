import { AssertionError } from "assert";

export default function NotEmpty(value: any, message?: string) {
    if(value.length > 0)
        return;

    throw new AssertionError({
        message: message || 'Expected expression to be not empty, but expression was empty',
        expected: '(non-empty expression)',
        actual: value
    })
}