import TestSuite from "./TestSuite";
import TestInfo from "./TestInfo";
import TestName from "./TestName";

export default function Test(test_name?: string) {
    return function (suite: TestSuite, method_name: string, info: TestInfo) {
        suite.addTest(test_name || TestName.toSentenceCase(method_name), info);
    }
}