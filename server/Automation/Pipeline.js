class Pipeline {
    constructor() {
        this.actions = {};
        this.filters = {};
        this.outputs = {};
        this.schedules = {};
    }

    register(action) {}
    registerFilter(filter) {}
    registerOutput(output) {}
    registerSchedule(schedule) {}
}

export default Pipeline;
