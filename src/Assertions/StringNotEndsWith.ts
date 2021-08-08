import { AssertionError } from "assert";

export default function StringNotEndsWith(needle: string, haystack: string|null, message?: string) {
    if(haystack === undefined || haystack === null || haystack.indexOf(needle) !== haystack.length - needle.length)
        return;

    throw new AssertionError({
        message: message || 'Expected string containing expression, but string did not contain expression',
        expected: needle,
        actual: haystack
    });
}