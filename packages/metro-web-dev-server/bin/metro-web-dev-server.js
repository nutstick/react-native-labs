#!/usr/bin/env node
/**
 * @ts-check
 */

"use strict";

// const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')
const { Server } = require("../dist");
// const argv = yargs(hideBin(process.argv)).argv

const server = new Server();
server.initialize().then(() => server.listen());
