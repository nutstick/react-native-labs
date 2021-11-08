declare module "metro-runtime/src/modules/HMRClient" {
  import { EventEmitter } from "eventemitter3";
  class HMRClient extends EventEmitter {
    constructor(url: string);
    close(): void;
    send(message: string): void;
    enable(): void;
    disable(): void;
    isEnabled(): boolean;
    hasPendingUpdates(): boolean;
  }
  export = HMRClient;
}
