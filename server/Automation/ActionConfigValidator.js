const isObject = a => !!a && a.constructor === Object;

class ActionConfigValidator {
    constructor(pipelineRef) {
        this.pipelineRef = pipelineRef;
    }

    validateActionConfig(actionConfig) {
        if (!actionConfig.action || !this.pipelineRef.actions[actionConfig.action]) {
            actionConfig.validationErrors.push("Invalid or missing Action type");
        }

        if (typeof actionConfig.filters !== "undefined" && !isObject(actionConfig.filters)) {
            actionConfig.validationErrors.push("Actionconfig 'Filters' is not an Object");
            return false;
        }
        if (typeof actionConfig.outputs !== "undefined" && !isObject(actionConfig.outputs)) {
            actionConfig.validationErrors.push("Actionconfig 'Outputs' is not an Object");
            return false;
        }

        if (actionConfig.children && !Array.isArray(actionConfig.children)) {
            actionConfig.validationErrors.push("Actionconfig 'Children'is not an Array");
        } else {
            this.validateChildrenIds(actionConfig, actionConfig.children);
        }
    }

    validateActionConfigOptions(actionConfig, action) {
        if (!actionConfig.options) return;

        if (!action) {
            actionConfig.validationErrors.push(`No valid Action given to check Options against`);
            return;
        }

        if (!isObject(actionConfig.options)) {
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

    validateActionConfigFilters(actionConfig) {
        if (!actionConfig.filters) return;

        if (!isObject(actionConfig.filters)) {
            actionConfig.validationErrors.push("Filters property is not an Object");
            return;
        }

        Object.keys(actionConfig.filters).forEach(filterId => {
            const filter = actionConfig.filters[filterId];

            if (filter.children && !Array.isArray(filter.children)) {
                actionConfig.validationErrors.push(`Filter 'children' is not an Array  for '${filterId}'`);
            } else {
                this.validateChildrenIds(actionConfig, filter.children);
            }

            if (!this.pipelineRef.filters[filter.type]) {
                actionConfig.validationErrors.push(`Invalid or missing Filter type for '${filterId}'`);
            }

            if (!Array.isArray(filter.filterValues)) {
                actionConfig.validationErrors.push(`The given 'filterValues' option is not an array for '${filterId}'`);
                return;
            }
        });
    }

    validateActionConfigOutputs(actionConfig) {
        if (!actionConfig.outputs) return;

        if (!isObject(actionConfig.outputs)) {
            actionConfig.validationErrors.push(`Outputs property is not an Object`);
            return;
        }

        Object.keys(actionConfig.outputs).forEach(outputId => {
            const output = actionConfig.outputs[outputId];

            if (!this.pipelineRef.outputs[output.type]) {
                actionConfig.validationErrors.push(`Invalid or missing Output type for '${outputId}'`);
            }
            if (!this.pipelineRef.schedules[output.schedule.type]) {
                actionConfig.validationErrors.push(`Invalid or missing Schedule type for '${outputId}'`);
            }
        });
    }

    validateRegistration(item) {
        if (!item.id) return "No 'id' property set";
        if (!item.title) return "No 'title' property set";
        if (!item.description) return "No 'description' property set";

        return true;
    }

    validateChildrenIds(actionConfig, childrenIdList) {
        childrenIdList.forEach(childId => {
            const isFilter = Object.keys(actionConfig.filters).some(filterId => {
                return filterId === childId;
            });
            const isOutput = Object.keys(actionConfig.outputs).some(outputId => {
                return outputId === childId;
            });

            if (!isFilter && !isOutput) {
                actionConfig.validationErrors.push(`Output with ID: ${childId} not found`);
            }
        });
    }
}

export default ActionConfigValidator;
