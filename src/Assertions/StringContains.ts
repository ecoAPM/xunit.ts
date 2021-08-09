import { AssertionError } from "assert";

export default function StringContains(needle: string, haystack: string|null, message?: string) {
    if(haystack !== undefined && haystack !== null && haystack.indexOf(needle) !== -1) {
        return;
    }

    throw new AssertionError({
        message: message || 'Expected string containing expression, but string did not contain expression',
        expected: needle,
        actual: haystack
    });
}