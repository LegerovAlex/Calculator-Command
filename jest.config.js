module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/logic/**/*.js', '!src/test/**/*.js'],
  coverageReporters: ['text', 'html'],
};
