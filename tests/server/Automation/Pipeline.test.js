import Pipeline from "../../../server/Automation/Pipeline";

import EventLoggerAction from "../../../server/Automation/Actions/EventLoggerAction";
import TestFilter from "../../../server/Automation/Filters/TestFilter";
import ConsoleMessageOutput from "../../../server/Automation/Outputs/ConsoleMessageOutput";
import InstantSchedule from "../../../server/Automation/Schedules/InstantSchedule";

describe("Server/Automation/Pipeline", () => {
    it("should register modules", () => {
        const pipeline = new Pipeline();
        pipeline.registerAction(new EventLoggerAction());
        pipeline.registerFilter(new TestFilter());
        pipeline.registerOutput(new ConsoleMessageOutput());
        pipeline.registerSchedule(new InstantSchedule());
    });
});
