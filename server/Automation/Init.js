import EventLoggerAction from "./Actions/EventLoggerAction";

import TestFilter from "./Filters/TestFilter";

import ConsoleMessageOutput from "./Outputs/ConsoleMessageOutput";

import InstantSchedule from "./Schedules/InstantSchedule";

/**
 * Registers the actions, filters, outputs and schedules
 * @param BunqAutomation
 */
export default BunqAutomation => {
    const pipeLine = BunqAutomation.pipeline;
    console.log(pipeLine);

    pipeLine.registerAction(new EventLoggerAction());

    pipeLine.registerFilter(new TestFilter());

    pipeLine.registerOutput(new ConsoleMessageOutput());

    pipeLine.registerSchedule(new InstantSchedule());

    console.log(pipeLine);
};
