import uuid from "uuid";

class ActionConfig {
    constructor(uuid = false, options = {}) {
        this.uuid = uuid || uuid.v4();
        const { action = false, filters = [], outputs = [], validationErrors = {}, ...customOptions } = options;
        this.action = action;
        this.filters = filters;
        this.outputs = outputs;
        this.validationErrors = validationErrors;

        Object.keys(customOptions).forEach(optionKey => {
            this[optionKey] = customOptions[optionKey];
        });
    }
}

export default ActionConfig;
