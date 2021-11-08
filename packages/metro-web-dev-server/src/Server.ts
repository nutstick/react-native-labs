import express from "express";
import { Express } from "express";
import http from "http";
import Metro from "metro";
import { indexHtml } from "./indexHtml";
import type { MetroMiddleWare } from "metro";
import type { ConfigT, YargArguments } from "metro-config";

interface Options {
  publicDir: string;
}

class Server {
  private options: Options;

  private connectMiddleware!: MetroMiddleWare;
  private metroConfig!: ConfigT;
  private app!: Express;

  constructor(options: Options = { publicDir: "./public" }) {
    this.options = options;
  }

  public async start(argv: YargArguments) {
    this.app = express();
    this.metroConfig = await Metro.loadConfig(argv, {
      serializer: {
        getModulesRunBeforeMainModule: () => [require.resolve("./setupHMR")],
      },
    });

    this.setupPublicDir();
    this.setupIndex();
    await this.setupMetro();

    try {
      const server = http.createServer(this.app);

      this.connectMiddleware.attachHmrServer(server);

      return new Promise<void>((resolve) => {
        const port = this.metroConfig.server.port;
        server.listen(port, "localhost", () => {
          console.log(`Your 🚇  is holding on http://localhost:${port}`);
          resolve();
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  private setupPublicDir() {
    const { publicDir } = this.options;
    this.app.use(express.static(publicDir));
  }

  private setupIndex() {
    const env = {
      BASE_URL: `localhost`,
      PORT: String(this.metroConfig.server.port),
    };

    this.app.get("/", (req, res) => {
      res.status(200).send(indexHtml(env));
    });
  }

  private async setupMetro() {
    this.connectMiddleware = await Metro.createConnectMiddleware(
      this.metroConfig
    );
    this.app.use(this.connectMiddleware.middleware);
  }
}

export default Server;
