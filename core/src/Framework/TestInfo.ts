type AsyncTest = () => Promise<void>;
type SyncTest = () => void;

export type AsyncTestInfo = TypedPropertyDescriptor<AsyncTest>;
export type SyncTestInfo = TypedPropertyDescriptor<SyncTest>;

type TestInfo = AsyncTestInfo | SyncTestInfo;
export default TestInfo;