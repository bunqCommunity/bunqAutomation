import LevelDb from "../../../server/StorageHandlers/LevelDb";

let levelDbInstance = null;
describe("Server/StorageHandlers/LevelDb", () => {
    beforeAll(() => {
        levelDbInstance = new LevelDb("storage/temp/tests", true);
    });
    afterAll(() => {});

    it("#set() - should set data", async () => {
        await levelDbInstance.set("test-key", "test-data");
    });

    it("#get() - should get data", async () => {
        await levelDbInstance.set("test-key", "test-data");

        const result = await levelDbInstance.get("test-key");

        expect(result).toBe("test-data");
    });

    it("#remove() - should remove data", async () => {
        await levelDbInstance.remove("test-key");
    });

    it("#streamSync() - should stream data", async () => {
        const result = await levelDbInstance.streamSync();

        console.log(result);
    });
});
