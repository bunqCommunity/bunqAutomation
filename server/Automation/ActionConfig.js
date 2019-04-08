import uuidLib from "uuid";

class ActionConfig {
    constructor(uuid = false, options = {}) {
        this.uuid = uuid || uuidLib.v4();
        this.options = options;
        this.action = false;
        this.active = false;
        this.filters = [];
        this.outputs = [];
        this.validationErrors = {};
    }
}

export default ActionConfig;
