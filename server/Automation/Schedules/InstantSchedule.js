import ToJSONHandler from "../ToJSONHandler";

export const instantScheduleId = "INSTANT";
export const instantScheduleTitle = "Instant";
export const instantScheduleDescription = "An instant schedule";

class InstantSchedule {
    constructor(store) {
        this.store = store;

        this.id = instantScheduleId;
        this.title = instantScheduleTitle;
        this.description = instantScheduleDescription;

        this.options = {};
    }

    toJSON = () => ToJSONHandler(this);
}

export default InstantSchedule;
