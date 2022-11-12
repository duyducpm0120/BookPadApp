module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {},
      },
    ],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
  ],
};
