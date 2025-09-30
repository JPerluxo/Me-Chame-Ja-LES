module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
    plugins: [
      "react-native-worklets/plugin",
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
      }],
      [
        "module-resolver",
        {
          alias: {
            "~": "./src",
          },
        }
      ],
    ],
  };
};