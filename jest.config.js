module.exports = {
  //   testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  moduleNameMapper: {
    "^@lich/(.*?)$": "<rootDir>/packages/$1/src"
  },
  //   rootDir: __dirname,
  testMatch: ["<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)"]
}
