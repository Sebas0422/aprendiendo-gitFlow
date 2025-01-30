export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: [
    './node_modules/(?!uuid|@palmetto/palmetto-components)',
  ],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^uuid$': '<rootDir>./node_modules/uuid/dist/esm-browser/index.js',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['./src/test/setupTests.ts'],
};