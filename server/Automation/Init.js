import TestAction from "./Actions/TestAction";

import TestFilter from "./Filters/TestFilter";

import TestOutput from "./Outputs/TestOutput";

import TestSchedule from "./Schedules/TestSchedule";

/**
 * Registers the actions, filters, outputs and schedules
 * @param BunqAutomation
 */
export default BunqAutomation => {
    const pipeLine = BunqAutomation.pipeline;
    console.log(pipeLine);

    pipeLine.registerAction(new TestAction());

    pipeLine.registerFilter(new TestFilter());

    pipeLine.registerOutput(new TestOutput());

    pipeLine.registerSchedule(new TestSchedule());

    console.log(pipeLine);
};
