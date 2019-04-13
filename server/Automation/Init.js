import glob from "glob";
import * as path from "path";

const normalizePath = modulePath => path.join("..", "..", modulePath);

/**
 * Registers the actions, filters, outputs and schedules
 * @param BunqAutomation
 */
export default async pipeline => {
    const globOptions = {};
    const basePath = `server${path.sep}Automation${path.sep}`;

    const Actions = glob.sync(`${basePath}Actions/*.js`, globOptions);
    const Filters = glob.sync(`${basePath}Filters/*.js`, globOptions);
    const Outputs = glob.sync(`${basePath}Outputs/*.js`, globOptions);
    const Schedules = glob.sync(`${basePath}Schedules/*.js`, globOptions);

    await Promise.all(
        Actions.map(async actionPath => {
            const Action = await import(normalizePath(actionPath));
            const Instance = new Action.default();

            if (!Instance.disabled) pipeline.registerAction(Instance);
        })
    );
    await Promise.all(
        Filters.map(async filterPath => {
            const Filter = await import(normalizePath(filterPath));
            const Instance = new Filter.default();

            if (!Instance.disabled) pipeline.registerFilter(Instance);
        })
    );
    await Promise.all(
        Outputs.map(async outputPath => {
            const Output = await import(normalizePath(outputPath));
            const Instance = new Output.default();

            if (!Instance.disabled) pipeline.registerOutput(Instance);
        })
    );
    await Promise.all(
        Schedules.map(async schedulePath => {
            const Schedule = await import(normalizePath(schedulePath));
            const Instance = new Schedule.default();

            if (!Instance.disabled) pipeline.registerSchedule(Instance);
        })
    );
};
