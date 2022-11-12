module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
          "@app": "./src/app",
          "@app/*": "./src/app/*",
          "@core": "./src/core",
          "@core/*": "./src/core/*",
        },
      },
    ],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
  ],
};
