module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "app": "./src",
        "actions": "./src/actions",
        "api": "./src/components",
        "hooks": "./src/hooks",
        "libs": "./src/libs",
        "navigations": "./src/navigations",
        "screens": "./src/screens",
        "store": "./src/store",
        "types": "./src/types"
      }
    }]
  ]
};
