module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/build/",
    "<rootDir>/cypress/",
  ],
  moduleNameMapper: {
    "@shared(.*)": "<rootDir>/src/shared/$1",
    "@features(.*)": "<rootDir>/src/features/$1",
    "@core(.*)": "<rootDir>/src/core/$1",
    "@mock(.*)": "<rootDir>/mock/$1",
  },
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testEnvironment: "jsdom",
};
