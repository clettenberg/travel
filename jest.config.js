module.exports = {
  roots: [
    'spec/javascript',
  ],
  verbose: true,
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
