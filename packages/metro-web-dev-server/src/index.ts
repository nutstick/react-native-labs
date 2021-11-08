import Server from "./Server";
import type { YargArguments } from "metro-config";

export async function runServer(argv: YargArguments) {
  const server = new Server();
  await server.start(argv);
}
