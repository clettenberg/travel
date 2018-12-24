module.exports = {
  roots: [
    'spec/javascript',
  ],
  verbose: true,
  testEnvironment: 'jest-environment-jsdom-global',
  setupTestFrameworkScriptFile: './node_modules/jest-enzyme/lib/index.js',
  setupFiles: [
    './spec/javascript/setup/enzyme.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/spec/setup/',
  ],
  testURL: 'http://localhost/',
};
