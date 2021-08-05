import {ResultType} from "./ResultType";

export default class TestResult {
    constructor(readonly type: ResultType, readonly duration: number) { }
}