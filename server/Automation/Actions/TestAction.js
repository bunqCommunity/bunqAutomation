class TestAction {
    constructor() {
        this.id = "test-action-id";

        // All the possible filters for this action
        // A monthly invoice action might only need an optional monetary account filter
        this.filters = [];

        // possible types of output
        this.outputs = [];

        // options
    }
}

export default TestAction;
