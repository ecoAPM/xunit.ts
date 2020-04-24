import { AssertionError } from "assert";

export default function Contains<T>(needle: T, haystack: T[], message?: string) {
    if(haystack.includes(needle))
        return;

    throw new AssertionError({
        message: message || 'Expected array containing expression, but array did not contain expression',
        expected: needle,
        actual: haystack
    });
}