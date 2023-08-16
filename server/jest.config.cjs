module.exports = {
  // The root directory for resolving paths
  rootDir: "./",

  // Test environment
  testEnvironment: "node", // You're likely testing server-side code, so node environment is common

  // The test regex pattern to match test files
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",

  // Directories to search for tests
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Coverage settings
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"], // Update with your source code directory
  coverageDirectory: "coverage",

  // Module file extensions
  moduleFileExtensions: ["js", "json"],

  // Transform files before testing
  transform: {
    "^.+\\.js$": "babel-jest", // Use Babel for transpiling JavaScript
  },
};
