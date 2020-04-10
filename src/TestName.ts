export default class TestName {
    public static toSentenceCase(test_name: string) {
        var result = test_name.replace(/([A-Z])/g, " $1").trim();
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}