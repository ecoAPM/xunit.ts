import { AssertionError } from "assert";

export default function NotContains<T>(needle: T, haystack: T[], message?: string) {
    if(!haystack.includes(needle))
        return;

    throw new AssertionError({
        message: message || 'Expected array not containing expression, but array contained expression',
        expected: needle,
        actual: haystack
    });
}