#!/usr/bin/env node
/**
 * @ts-check
 */

"use strict";

const yargs = require("yargs");
const makeServeCommand = require("metro/src/commands/serve");
const { runServer } = require("../dist");

const { command, description, builder, handler } = makeServeCommand();

yargs.command(command, description, builder, handler);

runServer(yargs.argv);
