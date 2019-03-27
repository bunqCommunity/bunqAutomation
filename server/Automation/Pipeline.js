import ConfigValidator from "./ConfigValidator";

class Pipeline {
    constructor() {
        this.validator = new ConfigValidator(this);

        // available modules
        this.actions = {};
        this.filters = {};
        this.outputs = {};
        this.schedules = {};

        // active modules configured by the user
        this.activeActions = {};
    }

    registerAction(action) {
        if (this.actions[action.id]) throw new Error("An Action with this ID has already been registered");

        const validation = this.validateRegistration(action);
        if (validation === true) {
            this.actions[action.id] = action;
            return true;
        }
        throw new Error(`Invalid Action given: ${validation}`);
    }

    registerFilter(filter) {
        if (this.actions[filter.id]) throw new Error("A Filter with this ID has already been registered");

        const validation = this.validateRegistration(filter);
        if (validation === true) {
            this.filters[filter.id] = filter;
            return true;
        }
        throw new Error(`Invalid Filter given: ${validation}`);
    }

    registerOutput(output) {
        if (this.actions[output.id]) throw new Error("An Output with this ID has already been registered");

        const validation = this.validateRegistration(output);
        if (validation === true) {
            this.outputs[output.id] = output;
            return true;
        }
        throw new Error(`Invalid Output given: ${validation}`);
    }

    registerSchedule(schedule) {
        if (this.actions[schedule.id]) throw new Error("A Schedule with this ID has already been registered");

        const validation = this.validateRegistration(schedule);
        if (validation === true) {
            this.schedules[schedule.id] = schedule;
            return true;
        }
        throw new Error(`Invalid Schedule given: ${validation}`);
    }

    validateRegistration(item) {
        if (!item.id) return "No 'id' property set";
        if (!item.description) return "No 'description' property set";

        return true;
    }
}

export default Pipeline;
