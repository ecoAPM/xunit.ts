import { AssertionError } from "assert";

export default function NotNull(value: any, message?: string) {
    if(value !== null) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected expression to be not null, but expression is null',
        expected: '(non-null expression)',
        actual: value
    });
}