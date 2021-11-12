import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("App", () => App);

if (__DEV__) {
  require("metro-web-dev-server/dist/setupHMR");
}

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});
