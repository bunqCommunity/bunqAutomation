import StorageInterface from "@bunq-community/bunq-js-client/dist/Interfaces/StorageInterface";

import ToJSONHandler from "../ToJSONHandler";

abstract class Output {
    public store: StorageInterface;

    public id: string;
    public title: string;
    public description: string;
    public schedule: string;

    public disabled?: boolean;

    // TODO define option scheme
    public options?: any;

    protected constructor(store: StorageInterface) {
        this.store = store;
    }

    // TODO standard method
    // abstract filter(inputValues: any, filterValues: any): boolean;

    toJSON = () => ToJSONHandler(this);
}

export default Output;
