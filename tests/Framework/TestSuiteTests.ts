import { Test, TestSuite } from "../../xunit";

export default class TestSuiteTests extends TestSuite {
	@Test()
	async CanAddTestsToRun() {
		//arrange
		const suite = new class X extends TestSuite {
		};

		//act
		suite.addTest("new test 1", {});
		suite.addTest("new test 2", {});
		const tests = suite.getTests([]);

		//assert
		this.assert.count(2, Object.keys(tests));
	}

	@Test()
	async CanFilterByClassName() {
		//arrange
		const suite = new class TestSuiteName extends TestSuite {
		};

		suite.addTest("new test 1", {
			value: async function newTest1() {
				return Promise.resolve();
			}
		});
		suite.addTest("new test 2", {
			value: async function newTest2() {
				return Promise.resolve();
			}
		});

		//act
		const tests = suite.getTests([new RegExp("TestSuiteName")]);

		//assert
		this.assert.count(2, Object.keys(tests));
	}

	@Test()
	async CanFilterByTestName() {
		//arrange
		const suite = new class TestSuiteName extends TestSuite {
		};

		suite.addTest("test A1", {
			value: async function testA1() {
				return Promise.resolve();
			}
		});
		suite.addTest("test A1B", {
			value: async function testA2() {
				return Promise.resolve();
			}
		});

		//act
		const tests = suite.getTests([new RegExp("testA1$")]);

		//assert
		this.assert.count(1, Object.keys(tests));
	}

	@Test()
	async CanFilterByPartialTestName() {
		//arrange
		const suite = new class TestSuiteName extends TestSuite {
		};

		suite.addTest("test A1", {
			value: async function testA1() {
				return Promise.resolve();
			}
		});
		suite.addTest("test A2", {
			value: async function testA2() {
				return Promise.resolve();
			}
		});

		suite.addTest("test B1", {
			value: async function testB1() {
				return Promise.resolve();
			}
		});
		suite.addTest("test B2", {
			value: async function testB2() {
				return Promise.resolve();
			}
		});

		//act
		const tests = suite.getTests([new RegExp("tB")]);

		//assert
		this.assert.count(2, Object.keys(tests));
	}

	@Test()
	async CanFilterByFullName() {
		//arrange
		const suite = new class TestSuiteName extends TestSuite {
		};

		suite.addTest("test A1", {
			value: async function testA1() {
				return Promise.resolve();
			}
		});
		suite.addTest("test A2", {
			value: async function testA2() {
				return Promise.resolve();
			}
		});

		//act
		const tests = suite.getTests([new RegExp("TestSuiteName.testA1")]);

		//assert
		this.assert.count(1, Object.keys(tests));
	}

	@Test()
	async CanSetTestsToRun() {
		//arrange
		const suite = new class X extends TestSuite {
		};
		const tests = { "new test 1": {}, "new test 2": {} };

		//act
		suite.setTests(tests);
		const tests_to_run = suite.getTests([]);

		//assert
		this.assert.count(2, Object.keys(tests_to_run));
	}

	@Test()
	async HasAssertionsBuiltIn() {
		//arrange
		const suite = new class X extends TestSuite {
		};

		//act
		const equal = suite.assert.equal;

		//assert
		this.assert.equal(this.assert.equal, equal);
	}
}