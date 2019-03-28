import glob from "glob";
import * as path from "path";

const normalizePath = modulePath => path.join("..", "..", modulePath);

/**
 * Registers the actions, filters, outputs and schedules
 * @param BunqAutomation
 */
export default async pipeline => {
    const Actions = glob.sync("server/Automation/Actions/*.js");
    const Filters = glob.sync("server/Automation/Filters/*.js");
    const Outputs = glob.sync("server/Automation/Outputs/*.js");
    const Schedules = glob.sync("server/Automation/Schedules/*.js");

    await Promise.all(
        Actions.map(async actionPath => {
            const Action = await import(normalizePath(actionPath));
            pipeline.registerAction(new Action.default());
        })
    );
    await Promise.all(
        Filters.map(async filterPath => {
            const Filter = await import(normalizePath(filterPath));
            pipeline.registerFilter(new Filter.default());
        })
    );
    await Promise.all(
        Outputs.map(async outputPath => {
            const Output = await import(normalizePath(outputPath));
            pipeline.registerOutput(new Output.default());
        })
    );
    await Promise.all(
        Schedules.map(async schedulePath => {
            const Schedule = await import(normalizePath(schedulePath));
            pipeline.registerSchedule(new Schedule.default());
        })
    );
};
