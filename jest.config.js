const testPattern = "tests/.*.test.jsx?$";

module.exports = {
    coverageReporters: ["json", "lcov", "text", "clover"],
    collectCoverage: true,
    collectCoverageFrom: ["server/**/*.{js}"],
    testRegex: testPattern,
    transform: {
        ".*.js$": "<rootDir>/node_modules/babel-jest"
    },
    moduleFileExtensions: ["js", "json", "node"]
};
