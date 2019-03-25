class TestOutput {
    constructor() {
        this.id = "test-output-id";
        this.description = "A test output which logs to the console";
        this.type = "CONSOLE_MESSAGE";
    }

    output(item) {
        console.log(item.message);
    }
}

export default TestOutput;
