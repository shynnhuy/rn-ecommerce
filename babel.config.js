module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "~app": "./src",
            "~redux": "./src/redux",
            "~navigators": "./src/navigators",
            "~screens": "./src/screens",
            "~utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
