module.exports = {
  preset: 'jest-expo',
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/@react-native-async-storage/async-storage.ts',
    '^@react-native-firebase/app$': '<rootDir>/__mocks__/@react-native-firebase/app.ts',
    '^@react-native-firebase/auth$': '<rootDir>/__mocks__/@react-native-firebase/auth.ts',
    '^@react-native-firebase/messaging$': '<rootDir>/__mocks__/@react-native-firebase/messaging.ts',
  },
};
