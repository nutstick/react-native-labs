/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");
const fs = require("fs");

module.exports = {
  watchFolders: [path.resolve(__dirname, "../../")],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    platforms: ['ios', 'android', 'native'],
    resolverMainFields: ["sbmodern", "browser", "main"],
  },
};
