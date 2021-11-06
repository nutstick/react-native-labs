import { AppRegistry } from "react-native";
import App from "./App";
import { default as HmrClient } from "./HMRClient";
// @ts-ignore
import { default as ReactRefreshRuntime } from "react-refresh/runtime";

HmrClient.setup(
  "web",
  "/src/index.bundle",
  window.process.env.BASE_URL ?? "localhost",
  window.process.env.PORT ?? "8081",
  true
);

ReactRefreshRuntime.injectIntoGlobalHook(window);

const Refresh = {
  performFullRefresh(reason: string) {
    console.log("Perform full refresh", reason);
    window.location.reload();
  },

  createSignatureFunctionForTransform:
    ReactRefreshRuntime.createSignatureFunctionForTransform,

  isLikelyComponentType: ReactRefreshRuntime.isLikelyComponentType,

  getFamilyByType: ReactRefreshRuntime.getFamilyByType,

  register: ReactRefreshRuntime.register,

  performReactRefresh() {
    if (ReactRefreshRuntime.hasUnrecoverableErrors()) {
      console.error("Fast refresh - Unrecolverable");
      window.location.reload();
      return;
    }
    ReactRefreshRuntime.performReactRefresh();
    console.log("Perform react refresh");
  },
};

// @ts-expect-error
require.Refresh = Refresh;

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});
