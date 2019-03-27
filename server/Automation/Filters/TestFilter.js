class TestFilter {
    constructor() {
        this.id = "MONETARY_ACCOUNT";
        this.description = "Test ";
    }

    filter(event) {
        console.log("Filtering event", event);
        return true;
    }
}

export default TestFilter;
