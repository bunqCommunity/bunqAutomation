export const VALID_ACTION_TYPES = ["EVENT", "CUSTOM"];
export const VALID_FILTER_TYPES = ["MONETARY_ACCOUNT", "VALUE"];
export const VALID_OUTPUT_TYPES = ["PAYMENT", "EMAIL", "NOTIFICATION", "CONSOLE_MESSAGE"];
export const VALID_SCHEDULE_TYPE = ["INSTANT", "DAILY", "WEEKLY", "MONTHLY"];

class Validator {
    constructor() {}

    validateStandardProperties(item) {
        if (!item.id) return "No 'id' property set";
        if (!item.description) return "No 'description' property set";

        return true;
    }

    validateAction(action) {
        if (!VALID_ACTION_TYPES.includes(action.type)) return "Invalid type";

        return this.validateStandardProperties(action);
    }
    validateFilter(filter) {
        if (!VALID_FILTER_TYPES.includes(filter.type)) return "Invalid type";

        return this.validateStandardProperties(filter);
    }
    validateOutput(output) {
        if (!VALID_OUTPUT_TYPES.includes(output.type)) return "Invalid type";

        return this.validateStandardProperties(output);
    }
    validateSchedule(schedule) {
        if (!VALID_SCHEDULE_TYPE.includes(schedule.type)) return "Invalid type";

        return this.validateStandardProperties(schedule);
    }
}

export default Validator;
