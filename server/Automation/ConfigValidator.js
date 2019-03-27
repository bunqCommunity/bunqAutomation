class ConfigValidator {
    constructor(pipelineRef) {
        this.pipelineRef = pipelineRef;
    }

    validateActionConfig(actionConfig) {
        let validationErrors = [];
        if (!this.pipelineRef.actions[actionConfig.action]) {
            validationErrors.push("Invalid action");
        }

        if (!Array.isArray(actionConfig.filters)) {
            validationErrors.push("Filter list is not an Array");
        } else {
            actionConfig.filters.forEach(filterConfig => {
                const validationResult = this.validateFilterConfig(filterConfig);
                if (validationResult !== true) validationErrors = [...validationErrors, ...validationResult];
            });
        }

        if (!Array.isArray(actionConfig.outputs)) {
            validationErrors.push("Output list is not an Array");
        } else {
            actionConfig.outputs.forEach(outputConfig => {
                const validationResult = this.validateOutputConfig(outputConfig);
                if (validationResult !== true) validationErrors = [...validationErrors, ...validationResult];
            });
        }

        if (validationErrors.length === 0) return true;
        return validationErrors;
    }

    validateFilterConfig(filterConfig) {
        let validationErrors = [];
        if (!this.pipelineRef.filters[filterConfig.id]) {
            validationErrors.push("Invalid filter type");
        }

        if (validationErrors.length > 0) return validationErrors;
        return true;
    }

    validateOutputConfig(outputConfig) {
        let validationErrors = [];
        if (!this.pipelineRef.outputs[outputConfig.id]) {
            validationErrors.push("Invalid output type");
        }

        if (!outputConfig.schedule) {
            validationErrors.push("Output is missing a schedule");
        } else {
            const validationResult = this.validateScheduleConfig(outputConfig.schedule);
            if (validationResult !== true) validationErrors = [...validationErrors, ...validationResult];
        }

        if (validationErrors.length > 0) return validationErrors;
        return true;
    }

    validateScheduleConfig(scheduleConfig) {
        let validationErrors = [];
        if (!this.pipelineRef.schedules[scheduleConfig.id]) {
            validationErrors.push("Invalid schedule type");
        }

        if (validationErrors.length > 0) return validationErrors;
        return true;
    }
}

export default ConfigValidator;
