module.exports = {
  preset: "jest-expo",
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["@testing-library/react-native/extend-expect"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};
