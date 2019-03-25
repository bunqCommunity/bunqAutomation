class TestSchedule {
    constructor() {
        this.id = "test-schedule-id";
        this.description = "An instant schedule";
        this.type = "INSTANT";
    }

    /**
     * When should the action run
     * @returns {boolean}
     */
    shouldRun(){
        return true;
    }
}

export default TestSchedule;
