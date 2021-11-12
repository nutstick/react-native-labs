import Server from "./Server";
import type { YargArguments } from "./types";

export async function runServer(argv: YargArguments) {
  const server = new Server();
  await server.start(argv);
}
