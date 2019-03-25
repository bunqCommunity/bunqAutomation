class TestFilter {
    constructor() {
        this.id = "test-filter-id";
        this.description = "A test filter which does absolutely nothing!";
        this.type = "MONETARY_ACCOUNT";
    }

    filter(event) {
        console.log("Filtering event", event);
        return true;
    }
}

export default TestFilter;
