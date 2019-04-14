import LevelDb from "../StorageHandlers/LevelDb";
import ConfigValidator from "./ConfigValidator";
import ActionConfig from "./ActionConfig";

export const ACTIVE_ACTIONS_LOCATION = "ACTIVE_ACTIONS_LOCATION";

const isObject = a => !!a && a.constructor === Object;

class Pipeline {
    constructor(logger) {
        this.logger = logger;
        this.pipelineStore = new LevelDb("bunq-automation-pipeline");
        this.validator = new ConfigValidator(this);

        // available modules
        this.actions = {};
        this.filters = {};
        this.outputs = {};
        this.schedules = {};

        // active modules configured by the user
        this.activeActions = {};
    }

    async startup() {
        const storedActiveActions = await this.pipelineStore.get(ACTIVE_ACTIONS_LOCATION);
    }

    updateAction(actionConfig) {
        return actionConfig;
    }

    actionConfigFromJson(config) {
        const uuid = config.uuid || false;
        const actionConfig = new ActionConfig(uuid);

        // set options from the confing
        actionConfig.active = !!config.active;
        actionConfig.action = config.action;
        actionConfig.options = config.options;
        actionConfig.filters = config.filters;
        actionConfig.outputs = config.outputs;

        if (!actionConfig.action || !this.actions[actionConfig.action]) {
            actionConfig.validationErrors.push("Invalid or missing Action type");
        } else {
            this.validateActionConfigOptions(actionConfig, this.actions[actionConfig.action]);
        }

        this.validateActionConfigFilters(actionConfig);
        this.validateActionConfigOutputs(actionConfig);

        return actionConfig;
    }

    validateActionConfigFilters(actionConfig) {
        if (!actionConfig.filters) return;

        if (!Array.isArray(actionConfig.filters)) {
            actionConfig.validationErrors.push("Filters property is not an Array");
            return;
        }

        actionConfig.filters.forEach((filter, index) => {
            if (!this.filters[filter.type]) {
                actionConfig.validationErrors.push(`Invalid or missing Filter type for index '${index}'`);
            }

            if (!Array.isArray(filter.filterValues)) {
                actionConfig.validationErrors.push(
                    `The given 'filterValues' option is not an array for index '${index}'`
                );
                return;
            }
        });
    }

    validateActionConfigOutputs(actionConfig) {
        if (!actionConfig.outputs) return;

        if (!Array.isArray(actionConfig.outputs)) {
            actionConfig.validationErrors.push(`Outputs property is not an Array`);
            return;
        }

        actionConfig.outputs.forEach((output, index) => {
            if (!this.outputs[output.type]) {
                actionConfig.validationErrors.push(`Invalid or missing Output type for index '${index}'`);
            }
            if (!this.schedules[output.schedule]) {
                actionConfig.validationErrors.push(`Invalid or missing Schedule type for index '${index}'`);
            }
        });
    }

    validateActionConfigOptions(actionConfig, action) {
        if (!actionConfig.options) return;

        if (actionConfig.options && !isObject(actionConfig.options)) {
            actionConfig.validationErrors.push(`Options property is not an Object`);
            return;
        }

        if (!action.options) {
            actionConfig.validationErrors.push(`Options property is not an Object`);
        }

        // go through each config option and cast to the configured value
        Object.keys(actionConfig.options).forEach(optionKey => {
            const optionValue = actionConfig.options[optionKey];

            if (!action.options || !action.options[optionKey]) {
                actionConfig.validationErrors.push(`Invalid or option given for option '${optionKey}'`);
                return;
            }

            const actionOptionConfig = action.options[optionKey];
            switch (actionOptionConfig.type) {
                case "STRING":
                    actionConfig.options[optionKey] = String(optionValue);
                    break;
                case "NUMBER":
                    actionConfig.options[optionKey] = Number(optionValue);
                    if (isNaN(actionConfig.options[optionKey])) {
                        actionConfig.validationErrors.push(
                            `The '${optionKey}' value failed to parse as a number 'NaN'`
                        );
                    }
                    break;
                case "BOOLEAN":
                    actionConfig.options[optionKey] = optionValue === true || optionValue === "true";
                    break;
                default:
                // nothing
            }
        });

        // check the possible options and set default values
        Object.keys(action.options).forEach(optionKey => {
            const optionConfig = action.options[optionKey];

            if (typeof actionConfig.options[optionKey] === "undefined") {
                if (optionConfig.required) {
                    actionConfig.validationErrors.push(`Missing required option '${optionKey}'`);
                }
                if (typeof optionConfig.defaultValue !== "undefined") {
                    actionConfig.options[optionKey] = optionConfig.defaultValue;
                }
            }
        });
    }

    validateRegistration(item) {
        if (!item.id) return "No 'id' property set";
        if (!item.description) return "No 'description' property set";

        return true;
    }

    /**
     * Registration handlers
     */
    registerAction(action) {
        if (this.actions[action.id]) throw new Error("An Action with this ID has already been registered");

        const validation = this.validateRegistration(action);
        if (validation === true) {
            this.actions[action.id] = action;
            return true;
        }
        throw new Error(`Invalid Action: ${validation}`);
    }
    registerFilter(filter) {
        if (this.actions[filter.id]) throw new Error("A Filter with this ID has already been registered");

        const validation = this.validateRegistration(filter);
        if (validation === true) {
            this.filters[filter.id] = filter;
            return true;
        }
        throw new Error(`Invalid Filter: ${validation}`);
    }
    registerOutput(output) {
        if (this.actions[output.id]) throw new Error("An Output with this ID has already been registered");

        const validation = this.validateRegistration(output);
        if (validation === true) {
            this.outputs[output.id] = output;
            return true;
        }
        throw new Error(`Invalid Output: ${validation}`);
    }
    registerSchedule(schedule) {
        if (this.actions[schedule.id]) throw new Error("A Schedule with this ID has already been registered");

        const validation = this.validateRegistration(schedule);
        if (validation === true) {
            this.schedules[schedule.id] = schedule;
            return true;
        }
        throw new Error(`Invalid Schedule: ${validation}`);
    }
}

export default Pipeline;
