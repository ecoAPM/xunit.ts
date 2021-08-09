import TestSuite from "./TestSuite";
import TestInfo from "./TestInfo";
import TestName from "./TestName";

/**
 * Annotates a test method within a {@link TestSuite}
 * 
 * @remarks
 * This instructs `xunit.ts` to run this method as part of its {@link TestSuite}
 *   
 * @param test_name (optional) the test's display name; if not set,
 *      a sentence case version of the method name will be used
 */
export default function Test(test_name?: string) {
    return function (suite: TestSuite, method_name: string, info: TestInfo) {
        suite.addTest(test_name || TestName.toSentenceCase(method_name), info);
    }
}