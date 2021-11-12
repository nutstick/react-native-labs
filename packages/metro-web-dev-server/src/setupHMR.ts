import { default as HmrClient } from "./HMRClient";
import { default as ReactRefreshRuntime } from "react-refresh/runtime";

declare global {
  interface NodeRequire {
    Refresh: unknown;
  }
}

HmrClient.setup(
  "web",
  "/index.bundle",
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

require.Refresh = Refresh;
