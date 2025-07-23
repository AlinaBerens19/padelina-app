module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?|@react-navigation)',
  ],
  moduleNameMapper: {
    '^expo$': '<rootDir>/__mocks__/expo.ts',
  },
};