/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require("path");
const fs = require("fs");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const rnPath = fs.realpathSync(
  path.resolve(require.resolve("react-native/package.json"), "..")
);

const assetRegistryPath = fs.realpathSync(
  path.resolve(require.resolve('react-native-web/dist/modules/AssetRegistry/index.js'), '..'),
)

module.exports = {
  watchFolders: [path.resolve(__dirname, "../../")],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    assetRegistryPath,
  },
  resolver: {
    platforms: ['web', 'ios', 'android', 'native'],
    resolverMainFields: ["sbmodern", "browser", "main"],
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => {
          if (name === "react-native") {
            return path.join(__dirname, `node_modules/${name}-web`);
          }
          return path.join(__dirname, `node_modules/${name}`);
        },
      }
    ),
    blockList: exclusionList([
      new RegExp(
        `${(path.resolve(rnPath) + path.sep).replace(/[/\\\\]/g, "[/\\\\]")}.*`
      ),
      // This stops "react-native run-web" from causing the metro server to crash if its already running
      new RegExp(
        `${path.resolve(__dirname, "web").replace(/[/\\\\]/g, "[/\\\\]")}.*`
      ),
    ]),
  },
};
