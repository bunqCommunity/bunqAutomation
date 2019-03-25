import EventLoggerAction from "./Actions/EventLoggerAction";

import TestFilter from "./Filters/TestFilter";

import ConsoleMessageOutput from "./Outputs/ConsoleMessageOutput";

import TestSchedule from "./Schedules/TestSchedule";

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

    pipeLine.registerSchedule(new TestSchedule());

    console.log(pipeLine);
};
