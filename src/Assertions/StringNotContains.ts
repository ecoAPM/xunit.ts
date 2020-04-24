import { AssertionError } from "assert";

export default function StringNotContains(needle: string, haystack: string, message?: string) {
    if(haystack.indexOf(needle) == -1)
        return;

    throw new AssertionError({
        message: message || 'Expected string not containing expression, but string did contain expression',
        expected: needle,
        actual: haystack
    });
}