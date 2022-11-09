/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");
const fs = require("fs");
const {
 makeMetroConfig 
} = require('@rnx-kit/metro-config')

const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

const root = path.resolve(__dirname, '../..');


module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    resolveRequest :   MetroSymlinksResolver (),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    platforms: ['ios', 'android', 'native'],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
  },
};
