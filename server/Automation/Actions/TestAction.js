class TestAction {
    constructor() {
        this.id = "test-action-id";
        this.type = "EVENT";
        this.description = "Logs to the console nothing when triggered!";

        this.filters = [];
        this.outputs = ["CONSOLE_MESSAGE"];
        this.schedules = ["INSTANT"];
    }

    run() {}
}

export default TestAction;
