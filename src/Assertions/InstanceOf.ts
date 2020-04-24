import { AssertionError } from "assert";

export default function InstanceOf<T>(type: any, value: any, message?: string) {
    if (value instanceof type)
        return;

    throw new AssertionError({
        message: message || `Expected expression of type, but was ${typeof value}`,
        expected: type,
        actual: typeof value
    })
}