import uuidLib from "uuid";
import Action from "./Actions/Action";

class ActionConfig {
    public active: boolean;
    public uuid: false | string;

    public action: false| Action;
    public users: any[];
    public options: any;
    public filters: any;
    public outputs: any;
    public children: any;
    public validationErrors: any;


    constructor(uuid = false) {
        this.active = false;
        this.uuid = uuid || uuidLib.v4();

        this.action = false;
        this.users = [];
        this.options = {};
        this.filters = {};
        this.outputs = {};
        this.children = [];
        this.validationErrors = [];
    }
}

export default ActionConfig;
