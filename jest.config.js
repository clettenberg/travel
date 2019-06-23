module.exports = {
  roots: [
    'app/javascript'
  ],
  verbose: true,
  setupFiles: [
    './app/javascript/testing/enzyme.js',
    './app/javascript/testing/windowSetup.js'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/spec/setup/'
  ],
  testURL: 'http://localhost/',
  moduleNameMapper: {
    '\\.(css|scss|jpg|png|svg)$': '<rootDir>/app/javascript/testing/empty-module.js'
  }
}
