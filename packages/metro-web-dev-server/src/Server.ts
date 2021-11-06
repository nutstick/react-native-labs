import path from "path";
import express from "express";
import fs from "graceful-fs";
import { Express } from "express";
import http from "http";
import Metro from "metro";
import helmet from "helmet";
import type { MetroMiddleWare } from "metro";
import type { ConfigT } from "metro-config";
import { indexHtml } from "./indexHtml";

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

  public async initialize() {
    this.app = express();
    this.metroConfig = await Metro.loadConfig();

    // this.app.use(helmet());

    // this.setupRoutes();
    this.setupPublicDir();
    this.setupIndex();
    await this.setupMetro();
  }

  private setupPublicDir() {
    const { publicDir } = this.options;
    this.app.use(express.static(publicDir));
  }

  private setupRoutes() {
    this.app.get("/", (req, res) => {
      fs.readFile(
        path.join(this.options.publicDir, "index.html"),
        (_err, content) => {
          res.end(content);
        }
      );
    });

    // this.app.use(function (err: any, req: any, res: any, _next: any) {
    //   knownErrors[req.url] = err;
    //   outputScreen();
    //   res.status(500).send("Something broke, check the console!");
    // });
  }

  private setupIndex() {
    const env = {
      BASE_URL: `localhost`,
      PORT: String(this.metroConfig.server.port),
    };
    const manifest = {
      bundles: [
        {
          name: "base",
          url: "/src/index.bundle?platform=web&dev=true&minify=false",
          priority: 0,
        },
      ],
    };

    this.app.get("/", (req, res) => {
      res.status(200).send(indexHtml(env, manifest));
    });
  }

  private async setupMetro() {
    this.connectMiddleware = await Metro.createConnectMiddleware(
      this.metroConfig
    );
    this.app.use(this.connectMiddleware.middleware);
  }

  public listen() {
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
}

export default Server;
