import Schedule from "./Schedule";

export const instantScheduleId = "INSTANT";
export const instantScheduleTitle = "Instant";
export const instantScheduleDescription = "An instant schedule";

class InstantSchedule extends Schedule {
    constructor(store) {
        super(store);

        this.id = instantScheduleId;
        this.title = instantScheduleTitle;
        this.description = instantScheduleDescription;

        this.options = {};
    }
}

export default InstantSchedule;
