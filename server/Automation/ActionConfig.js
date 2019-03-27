import uuid from "uuid";

class ActionConfig {
    constructor(jsonConfig) {
        this.uuid = jsonConfig.uuid || uuid.v4();
        this.action = jsonConfig.action || false;
        this.filters = jsonConfig.filters || [];
        this.outputs = jsonConfig.outputs || [];
    }
}

export default ActionConfig;
