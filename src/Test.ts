import { TestSuite } from "../tscunit";
import TestInfo from "./TestInfo";
import TestName from "./TestName";

export default function Test(test_name: string | null = null) {
    return function (suite: TestSuite, method_name: string, info: TestInfo) {
        suite.addTest(test_name || TestName.toSentenceCase(method_name), info);
    }
}