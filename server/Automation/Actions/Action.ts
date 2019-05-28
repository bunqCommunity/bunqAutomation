import StorageInterface from "@bunq-community/bunq-js-client/dist/Interfaces/StorageInterface";

import ToJSONHandler from "../ToJSONHandler";

abstract class Action {
    public store: StorageInterface;

    public id: string;
    public title: string;
    public description: string;

    public disabled?: boolean;

    // TODO
    public options: any;

    // standard config options
    public type: string;
    public filters: string[];
    public outputs: string[];

    protected constructor(store: StorageInterface) {
        this.store = store;
    }

    abstract check();

    toJSON = () => ToJSONHandler(this);
}

export default Action;
