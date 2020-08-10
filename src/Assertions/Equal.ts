import { AssertionError } from "assert";
import equal from 'lodash.isequal';

export default function Equal(expected: any, actual: any, message?: string) {
    if(equal(actual, expected))
        return;

    throw new AssertionError({
        message: message || 'Expected expressions to be equal, but expressions are not equal',
        expected: expected,
        actual: actual,
    });
}