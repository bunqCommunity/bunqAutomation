import LevelDb from "../StorageHandlers/LevelDb";
import ActionConfigValidator from "./ActionConfigValidator";
import ActionConfig from "./ActionConfig";

export const CONFIGURED_ACTIONS_LOCATION = "CONFIGURED_ACTIONS_LOCATION";

class Pipeline {
    constructor(logger) {
        this.logger = logger;
        this.pipelineStore = new LevelDb("bunq-automation-pipeline");
        this.validator = new ActionConfigValidator(this);

        // available modules
        this.actions = {};
        this.filters = {};
        this.outputs = {};
        this.schedules = {};

        // active modules configured by the user
        this.configuredActions = {};
    }

    async startup() {
        const storedConfiguredActions = await this.pipelineStore.get(CONFIGURED_ACTIONS_LOCATION);
    }

    updateAction(actionConfig) {
        return actionConfig;
    }

    actionConfigFromJson(config) {
        const uuid = config.uuid || false;
        const actionConfig = new ActionConfig(uuid);

        // set options from the confing
        actionConfig.active = !!config.active;
        actionConfig.users = config.users || [];
        actionConfig.action = config.action;
        actionConfig.options = config.options || {};
        actionConfig.filters = config.filters || {};
        actionConfig.outputs = config.outputs || {};

        // TODO check if children IDs exist
        actionConfig.children = config.children;

        if (!actionConfig.action || !this.actions[actionConfig.action]) {
            actionConfig.validationErrors.push("Invalid or missing Action type");
        } else {
            this.validator.validateActionConfigOptions(actionConfig, this.actions[actionConfig.action]);
        }

        this.validator.validateActionConfigFilters(actionConfig);
        this.validator.validateActionConfigOutputs(actionConfig);

        return actionConfig;
    }

    /**
     * Registration handlers
     */
    registerAction(action) {
        if (this.actions[action.id]) throw new Error("An Action with this ID has already been registered");

        const validation = this.validator.validateRegistration(action);
        if (validation === true) {
            this.actions[action.id] = action;
            return true;
        }
        throw new Error(`Invalid Action: ${validation}`);
    }
    registerFilter(filter) {
        if (this.actions[filter.id]) throw new Error("A Filter with this ID has already been registered");

        const validation = this.validator.validateRegistration(filter);
        if (validation === true) {
            this.filters[filter.id] = filter;
            return true;
        }
        throw new Error(`Invalid Filter: ${validation}`);
    }
    registerOutput(output) {
        if (this.actions[output.id]) throw new Error("An Output with this ID has already been registered");

        const validation = this.validator.validateRegistration(output);
        if (validation === true) {
            this.outputs[output.id] = output;
            return true;
        }
        throw new Error(`Invalid Output: ${validation}`);
    }
    registerSchedule(schedule) {
        if (this.actions[schedule.id]) throw new Error("A Schedule with this ID has already been registered");

        const validation = this.validator.validateRegistration(schedule);
        if (validation === true) {
            this.schedules[schedule.id] = schedule;
            return true;
        }
        throw new Error(`Invalid Schedule: ${validation}`);
    }
}

export default Pipeline;
