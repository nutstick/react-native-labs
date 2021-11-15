# metro-web-dev-server

## Description

Simple dev server using metro to build web.

## Installation

Install `metro-web-dev-server`

```
npm install --dev metro-web-dev-server
```

Create `metro.web.config.js` extends from your `metro.config.js`

```diff
+ const path = require("path");
+ const fs = require("fs");
+ const exclusionList = require("metro-config/src/defaults/exclusionList");


+  const rnPath = fs.realpathSync(
+   path.resolve(require.resolve("react-native/package.json"), "..")
+ );
 
+ const assetRegistryPath = fs.realpathSync(
+   path.resolve(require.resolve('react-native-web/dist/modules/AssetRegistry/index.js'), '..'),
+ )
 
  module.exports = {
    transformer: {
      ...
+     assetRegistryPath,
    }
    resolver: {
-     platforms: ['ios', 'android', 'native'],
+     platforms: ['web', 'ios', 'android', 'native'],
+     blockList: exclusionList([
+       new RegExp(
+         `${(path.resolve(rnPath) + path.sep).replace(/[/\\\\]/g, "[/\\\\]")}.*`
+       ),
+       new RegExp(
+         `${path.resolve(__dirname, "web").replace(/[/\\\\]/g, "[/\\\\]")}.*`
+       ),
+   ]),
    }
  }

```

Add scripts in your `package.json`

```diff
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
+   "web": "metro-web-dev-server --entry-file index.js -c metro.web.config.js"
  },
```

## Available options

### Metro options

This options extends from `metro serve` command https://facebook.github.io/metro/docs/cli

### Extra commands

#### **-E, --entry-file**

Configure bundle entry file, point to your App entry file relative to root folder e.g. `index.js`, `src/index.ts`

### **--html**

HTML file entry, will auto replace __BUNDLE_URL__ as bundle url, __ENV__ as process.env

Custom html file

## FAQ

### Issue with AsyncStorage

Because metro has logic to prioritize resolve file to `.native.js` over `.js`, it will cause issue when try to bundling library that assume using this method to support multiple platforms such as `@react-native-async-storage/async-storage` or `redux`

The solution is to patch metro to support custom `preferNativePlatform`, and make `preferNativePlatform: false` in your `metro.web.config.js`

```diff
diff --git a/src/node-haste/DependencyGraph.js b/src/node-haste/DependencyGraph.js
index 477a1ebac62e4c4f0bf42f0be7d9662f2dcce288..2a210de5b5968b6a5b5edca44d900b93c0e19f55 100644
--- a/src/node-haste/DependencyGraph.js
+++ b/src/node-haste/DependencyGraph.js
@@ -200,7 +200,10 @@ class DependencyGraph extends EventEmitter {
       moduleCache: this._moduleCache,
       moduleMap: this._moduleMap,
       nodeModulesPaths: this._config.resolver.nodeModulesPaths,
-      preferNativePlatform: true,
+      preferNativePlatform:
+        this._config.resolver.preferNativePlatform != null
+          ? this._config.resolver.preferNativePlatform
+          : true,
       projectRoot: this._config.projectRoot,
       resolveAsset: (dirPath, assetName, extension) => {
         const basePath = dirPath + path.sep + assetName;
```

then in your `metro.web.config.js`

```diff
  module.exports = {
    ...
    resolver: {
+     preferNativePlatform: true
    }
  }
```

### Hot reload support

This package also provide you a quick setup of Hot module reload and react fast refresh. You may import `metro-web-dev-server/dist/setupHMR` in your bundle entry

```diff
+ if (__DEV__) {
+   require("metro-web-dev-server/dist/setupHMR");
+ }

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});

```