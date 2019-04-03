require("dotenv").config();
const Encryption = require("../build-server/Security/Encryption").default;

const encryption = new Encryption();

const getTime = () => {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000 + hrTime[1] / 1000;
};

const testRounds = (rounds = false) => {
    const roundsText = rounds === false ? "Default" : rounds.toLocaleString();
    const paddedText = roundsText.padEnd(10, " ");
    process.stdout.write(`\nTesting rounds: ${paddedText} = `);

    const start = getTime();
    encryption.derivePassword("some_random_password", false, 32, rounds);
    const end = getTime();

    const difference = end - start;
    const differenceSeconds = difference / 1000;

    const paddedResult = differenceSeconds.toLocaleString().padEnd(9, " ");
    process.stdout.write(`${paddedResult} milliseconds`);
};

testRounds();
testRounds(100000);
testRounds(200000);
testRounds(400000);
testRounds(800000);
testRounds(1000000);
testRounds(2000000);
testRounds(3000000);

console.log("\n\nDone");
