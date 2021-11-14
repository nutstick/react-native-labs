#!/usr/bin/env node
/**
 * @ts-check
 */

"use strict";

const yargs = require("yargs");
const makeServeCommand = require("metro/src/commands/serve");
const { runServer } = require("../dist");

const { command, description, builder, handler } = makeServeCommand();

yargs.command(
  "*",
  description,
  (yargs) => {
    builder(yargs);
    yargs.option("entry-file", {
      alias: "E",
      type: "string",
      default: "index.js",
    });
    yargs.option("html", {
      type: "string",
    });
  },
  async (argv) => {
    try {
      await runServer(argv);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
).argv;
