import Pipeline from "../../../server/Automation/Pipeline";
import Init from "../../../server/Automation/Init";

describe("Server/Automation/Init", () => {
    it("should auto load all modules", async () => {
        const pipeline = new Pipeline();
        await Init(pipeline);
    });
});
