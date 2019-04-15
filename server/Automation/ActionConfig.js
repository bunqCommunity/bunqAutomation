import uuidLib from "uuid";

class ActionConfig {
    constructor(uuid = false) {
        this.active = false;
        this.uuid = uuid || uuidLib.v4();

        this.action = false;
        this.options = {};
        this.filters = {};
        this.outputs = {};
        this.children = [];
        this.validationErrors = [];
    }
}

export default ActionConfig;
