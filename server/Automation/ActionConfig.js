import uuidLib from "uuid";

const config = {
    active: false,
    action: "BALANCE_WARNING",
    options: {
        allAccounts: true
    },
    outputs: [
        {
            type: "CONSOLE_MESSAGE",
            schedule: "INSTANT"
        }
    ]
};

class ActionConfig {
    constructor(uuid = false) {
        this.active = false;
        this.uuid = uuid || uuidLib.v4();

        this.action = false;
        this.options = {};
        this.filters = [];
        this.outputs = [];
        this.validationErrors = {};
    }

    load() {

    }
}

export default ActionConfig;
