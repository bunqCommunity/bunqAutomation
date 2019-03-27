class Validator {
    constructor(pipelineRef) {
        this.pipelineRef = pipelineRef;
    }

    validateActionConfig(config) {}

    validateAction(action) {
        if (!this.pipelineRef.actions[action.id]) return "Invalid type";

        return true;
    }
    validateFilter(filter) {
        if (!this.pipelineRef.filters[filter.id]) return "Invalid type";

        return true;
    }
    validateOutput(output) {
        if (!this.pipelineRef.outputs[output.id]) return "Invalid type";

        return true;
    }
    validateSchedule(schedule) {
        if (!this.pipelineRef.schedules[schedule.id]) return "Invalid type";

        return true;
    }
}

export default Validator;
